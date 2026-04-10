import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { products } from '@/data/products';

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
    <section className="pt-10 pb-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
            Compará precios reales<br />
            <span className="text-primary">de ropa en todo el mundo</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            Datos verificados de tiendas oficiales en {country?.flag} {country?.name}
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar Nike, Adidas, Levi's, Air Max..."
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => query.length >= 2 && setShowSuggestions(true)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
              className="w-full bg-card border border-border rounded-2xl pl-12 pr-10 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
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
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-8 h-8 object-contain rounded"
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
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
          className="flex flex-wrap justify-center gap-2"
        >
          {quickSearches.map(s => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="text-xs bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              {s}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
