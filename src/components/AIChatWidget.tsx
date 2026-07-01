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
import { buildAssistantReply, type AssistantContext } from '@/lib/assistantIntelligence';
import { logActivity } from '@/lib/activity';

type Msg = { role: 'user' | 'assistant'; content: string };
type VisibleProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  currencySymbol: string;
  store: string;
};

const SUGGESTIONS = [
  '¿Dónde están más baratas las Nike Air Force 1?',
  '¿Qué zapatillas me recomendás por menos de $100 USD?',
  'Compará precios de Adidas Samba entre países',
];

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
        countryCode: null,
        cityName: null,
        cityId: null,
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
              id: product.id,
              name: product.name,
              brand: product.brand,
              category: product.category,
              price: offer.price,
              currency: offer.currency,
              currencySymbol: offer.currencySymbol,
              store: offer.store,
            }
          : null;
      })
      .filter((item): item is VisibleProduct => Boolean(item))
      .sort((a, b) => a.price - b.price);

    return {
      countryName: country.name,
      countryCode: country.code,
      cityName: city.name,
      cityId: city.id,
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

    try {
      await logActivity('ai_query', {
        query: queryText.slice(0, 200),
        country: appContext.countryName || '',
        city: appContext.cityName || '',
        brand: appContext.brand || '',
        category: appContext.category || '',
      });

      const assistantReply = buildAssistantReply(queryText, appContext as AssistantContext);
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantReply }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: 'assistant', content: e.message || 'No pude procesar tu consulta. Intentá de nuevo.' }]);
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
