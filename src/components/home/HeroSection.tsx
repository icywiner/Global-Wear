import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, CheckCircle, ExternalLink, TrendingDown } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';
import { getProductsForLocation, getAllBrands } from '@/data/products';

const popularSearches = ['Nike Air Force 1', 'Adidas Samba', "Levi's 501", 'Converse Chuck 70', 'Vans Old Skool'];

export default function HeroSection() {
  const { country, city } = useLocation();

  const totalProducts = country && city ? getProductsForLocation(country.code, city.id).length : 0;
  const allBrands = getAllBrands();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <TrendingDown className="w-4 h-4" />
            Encontrá el mejor precio · {country?.name || 'Global'}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            Compará precios reales
            <br />
            <span className="text-primary">de ropa en todo el mundo</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Datos verificados de tiendas oficiales. {countries.length} países, {totalProducts}+ productos
            y {allBrands.length} marcas con enlaces directos.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-xl mx-auto mb-5"
        >
          <Link
            to="/explorar"
            className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-4 text-muted-foreground hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
          >
            <Search className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm">Buscar Nike Air Force 1, Adidas Samba, Levi's 501...</span>
          </Link>
        </motion.div>

        {/* Popular tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {popularSearches.map(s => (
            <Link
              key={s}
              to={`/explorar?q=${encodeURIComponent(s)}`}
              className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {s}
            </Link>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> Tiendas verificadas
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" /> Precios oficiales
          </span>
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-accent" /> Enlaces directos
          </span>
        </motion.div>
      </div>
    </section>
  );
}
