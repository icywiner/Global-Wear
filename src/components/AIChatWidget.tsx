import { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { useBrand } from '@/context/BrandContext';
import {
  categories,
  getCatalogBestOffer,
  getCatalogProductsForSelection,
  type Category,
} from '@/data/catalog';

type Msg = { role: 'user' | 'assistant'; content: string };
type VisibleProduct = {
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  currencySymbol: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SUGGESTIONS = [
  '¿Dónde están más baratas las Nike Air Force 1?',
  '¿Qué zapatillas me recomendás por menos de $100 USD?',
  'Compará precios de Adidas Samba entre países',
];

const BRAND_ALIASES: Record<string, string> = {
  'levis': "Levi's",
  'levi': "Levi's",
  'the north face': 'The North Face',
  'new balance': 'New Balance',
};

const CATEGORY_ALIASES: Array<{ match: string[]; value: string }> = [
  { match: ['zapatilla', 'zapatillas', 'sneaker', 'sneakers'], value: 'zapatillas' },
  { match: ['remera', 'remeras', 't-shirt', 'camiseta'], value: 'remeras' },
  { match: ['buzo', 'buzos', 'hoodie', 'hoodies'], value: 'buzos' },
  { match: ['campera', 'camperas', 'jacket', 'jackets'], value: 'camperas' },
  { match: ['jean', 'jeans'], value: 'jeans' },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function formatMoney(product: VisibleProduct) {
  return `${product.currencySymbol}${product.price.toLocaleString()} ${product.currency}`;
}

function inferBrand(query: string, fallbackBrand: string | null) {
  const normalized = normalizeText(query);
  const brands = ['Nike', 'Adidas', 'Puma', "Levi's", 'Converse', 'Vans', 'Champion', 'The North Face', 'New Balance'];
  const found = brands.find((brand) => normalized.includes(normalizeText(brand)));
  if (found) return found;

  const alias = Object.entries(BRAND_ALIASES).find(([aliasName]) => normalized.includes(aliasName));
  return alias?.[1] || fallbackBrand || null;
}

function inferCategory(query: string, fallbackCategory: string | null) {
  const normalized = normalizeText(query);
  const alias = CATEGORY_ALIASES.find((item) => item.match.some((word) => normalized.includes(word)));
  return alias?.value || fallbackCategory || null;
}

function isAvailabilityQuestion(query: string) {
  return /\b(hay|existe|disponible|disponibles|tienen)\b/i.test(query);
}

function isCheapestQuestion(query: string) {
  return /\b(mas barata|más barata|mas barata|mas economica|más economica|más económica|menor precio|barata|barato)\b/i.test(query);
}

function getLocalAssistantReply(query: string, context: { countryName: string | null; cityName: string | null; currency: string | null; currencySymbol: string | null; brand: string | null; category: Category | null; visibleProducts: VisibleProduct[]; }) {
  const brand = inferBrand(query, context.brand);
  const category = inferCategory(query, context.category);
  const products = context.visibleProducts.filter((item) => {
    if (brand && item.brand !== brand) return false;
    if (category && item.category !== category) return false;
    return true;
  });

  if (products.length === 0) {
    return 'No encontré productos disponibles para esa búsqueda en este momento.';
  }

  const cheapest = [...products].sort((a, b) => a.price - b.price)[0];
  const mostExpensive = [...products].sort((a, b) => b.price - a.price)[0];

  if (isCheapestQuestion(query)) {
    const label = [category, brand].filter(Boolean).join(' ');
    const location = [context.cityName, context.countryName].filter(Boolean).join(', ');
    return `La ${label || 'opción'} más económica en ${location} es ${cheapest.name} por ${formatMoney(cheapest)}.`;
  }

  if (isAvailabilityQuestion(query)) {
    const location = [context.cityName, context.countryName].filter(Boolean).join(', ');
    const label = [category, brand].filter(Boolean).join(' ');
    return `Sí, hay ${products.length} modelos de ${label || 'esa búsqueda'} en ${location}. El más barato es ${cheapest.name} (${formatMoney(cheapest)}) y el más caro es ${mostExpensive.name} (${formatMoney(mostExpensive)}).`;
  }

  if (products.length === 1) {
    return `Encontré 1 producto: ${products[0].name} por ${formatMoney(products[0])}.`;
  }

  return `Encontré ${products.length} productos. El más barato es ${cheapest.name} (${formatMoney(cheapest)}) y el más caro es ${mostExpensive.name} (${formatMoney(mostExpensive)}).`;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { country, city } = useLocation();
  const { selectedBrand } = useBrand();
  const [searchParams] = useSearchParams();

  const selectedCategory = useMemo(() => {
    const value = searchParams.get('categoria');
    return categories.some((item) => item.id === value) ? (value as Category) : null;
  }, [searchParams]);

  const appContext = useMemo(() => {
    if (!country || !city) {
      return {
        countryName: null,
        cityName: null,
        currency: null,
        currencySymbol: null,
        brand: selectedBrand,
        category: selectedCategory,
        visibleProducts: [],
      };
    }

    const visibleProducts = getCatalogProductsForSelection(country.code, city.id, {
      brand: selectedBrand,
      category: selectedCategory,
    })
      .map((product) => {
        const offer = getCatalogBestOffer(product.id, country.code, city.id);
        return offer
          ? {
              name: product.name,
              brand: product.brand,
              category: product.category,
              price: offer.price,
              currency: offer.currency,
              currencySymbol: offer.currencySymbol,
            }
          : null;
      })
      .filter((item): item is VisibleProduct => Boolean(item))
      .sort((a, b) => a.price - b.price);

    return {
      countryName: country.name,
      cityName: city.name,
      currency: country.currency,
      currencySymbol: country.currencySymbol,
      brand: selectedBrand,
      category: selectedCategory,
      visibleProducts,
    };
  }, [country, city, selectedBrand, selectedCategory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    const queryText = text.trim();
    if (!queryText || isLoading) return;

    const userMsg: Msg = { role: 'user', content: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    let assistantSoFar = '';

    try {
      const history = [...messages, userMsg];
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history, context: appContext }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Error al conectar con el asistente');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const snapshot = assistantSoFar;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: snapshot } : m);
                }
                return [...prev, { role: 'assistant', content: snapshot }];
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (e: any) {
      const fallbackReply = getLocalAssistantReply(queryText, appContext);
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackReply || e.message || 'No pude procesar tu consulta. Intentá de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Asistente GlobalWear</p>
                  <p className="text-[10px] text-muted-foreground">IA · Comparación inteligente</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <Bot className="w-10 h-10 text-primary/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">
                    ¡Hola! Soy tu asistente de compras. Preguntame sobre precios, productos o marcas.
                  </p>
                  <div className="space-y-2">
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="w-full text-left text-xs bg-secondary/60 text-foreground px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-foreground rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-secondary px-3 py-2 rounded-xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2 px-3 py-3 border-t border-border"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Preguntá sobre precios, productos..."
                className="flex-1 bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
