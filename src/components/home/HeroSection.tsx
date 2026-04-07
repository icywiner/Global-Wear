import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { products } from '@/data/products';

const quickSearches = ['Nike Air Force 1', 'Adidas Samba', "Levi's 501", 'Converse Chuck 70', 'Vans Old Skool', 'Air Max 90', 'New Balance 574'];

export default function HeroSection() {
  const { country } = useLocation();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const suggestions = query.length >= 2
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (q: string) => {
    if (q.trim()) {
      navigate(`/explorar?q=${encodeURIComponent(q.trim())}`);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <section className="pt-8 pb-6 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Compará precios reales de ropa
          </h1>
          <p className="text-sm text-muted-foreground">
            Datos verificados de tiendas oficiales en {country?.flag} {country?.name}
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative mb-5"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar Nike, Adidas, Levi's, Air Max..."
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
              className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm"
            />
          </div>

          {/* Autocomplete dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              {suggestions.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSearch(p.name)}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-secondary/60 flex items-center gap-3 transition-colors"
                >
                  <span className="text-muted-foreground text-xs uppercase font-semibold w-16">{p.brand}</span>
                  <span className="text-foreground">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick search chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {quickSearches.map(s => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {s}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
