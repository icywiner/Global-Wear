import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { products } from '@/data/products';
import SmartImage from '@/components/ui/SmartImage';

const quickSearches = ['Nike Air Force 1', 'Adidas Samba', "Levi's 501", 'Air Max 90', 'New Balance 574', 'Vans Old Skool', 'Converse Chuck 70', 'Puma Suede'];

export default function HeroSection() {
  const { country } = useLocation();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = query.length >= 2
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (q: string) => {
    if (q.trim()) {
      navigate(`/explorar?q=${encodeURIComponent(q.trim())}`);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <section className="pt-10 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[28px] border border-border/70 bg-card/75 backdrop-blur-sm p-8 md:p-12 shadow-lg"
        >
          <div className="absolute inset-0 bg-grid-soft opacity-50" />
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />

          <div className="relative text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Datos de tiendas oficiales verificadas
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight tracking-tight">
              Compara precios reales de
              <span className="block text-primary">ropa en todo el mundo</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubri donde conviene comprar Nike, Adidas, Levi's y mas. Misma marca, distintas ciudades, mejor decision.
            </p>
          </div>

          {/* Search */}
          <motion.div
            ref={wrapperRef}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-7 max-w-3xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por producto o marca"
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
                className="w-full bg-white/95 border border-border rounded-2xl pl-12 pr-10 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-md transition-shadow hover:shadow-lg"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setShowSuggestions(false); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                {suggestions.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigate(`/producto/${p.id}`);
                      setQuery('');
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-secondary/60 flex items-center gap-3 transition-colors border-b border-border/50 last:border-0"
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary/50 p-1 overflow-hidden shrink-0">
                      <SmartImage
                        sources={p.images}
                        alt={p.name}
                        imgClassName="w-full h-full object-contain"
                        skeletonClassName="w-full h-full rounded bg-slate-200/70 animate-pulse"
                      />
                    </div>
                    <div>
                      <span className="text-foreground font-medium">{p.name}</span>
                      <span className="text-muted-foreground text-xs ml-2">{p.brand}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-7"
          >
            {quickSearches.map(s => (
              <button
                key={s}
                onClick={() => handleSearch(s)}
                className="text-xs bg-secondary/90 text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                {s}
              </button>
            ))}
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
            <div className="rounded-2xl border border-border bg-white/80 p-4">
              <p className="text-xs text-muted-foreground mb-1">Ubicacion activa</p>
              <p className="font-semibold text-foreground">{country?.flag} {country?.name || 'Selecciona un pais'}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white/80 p-4 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm">Fuentes verificadas</p>
                <p className="text-xs text-muted-foreground">Solo tiendas oficiales y enlaces reales</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white/80 p-4 flex items-start gap-3">
              <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm">Comparacion inteligente</p>
                <p className="text-xs text-muted-foreground">Mismo producto, distintas ciudades y monedas</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
