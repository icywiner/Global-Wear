import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { getProductsForLocation, products } from '@/data/products';

export default function BrandsGrid() {
  const { country, city } = useLocation();

  const brands = useMemo(() => {
    const prods = country && city
      ? getProductsForLocation(country.code, city.id)
      : products;

    const brandMap = new Map<string, number>();
    prods.forEach(p => brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1));

    return [...brandMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [country?.code, city?.id]);

  if (brands.length === 0) return null;

  const brandColors: Record<string, string> = {
    Nike: 'from-orange-500 to-red-500',
    Adidas: 'from-blue-500 to-indigo-500',
    "Levi's": 'from-red-600 to-red-800',
    Converse: 'from-red-500 to-pink-500',
    Vans: 'from-gray-700 to-gray-900',
    Champion: 'from-blue-600 to-blue-800',
    'The North Face': 'from-gray-600 to-gray-800',
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Marcas Oficiales
          </h2>
          <Link to="/explorar" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            Ver todas <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link
                to={`/explorar?marca=${encodeURIComponent(brand.name)}`}
                className="group flex flex-col items-center gap-2 bg-card border border-border rounded-2xl px-4 py-5 hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brandColors[brand.name] || 'from-primary/60 to-primary'} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                  {brand.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground text-center leading-tight">
                  {brand.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {brand.count} {brand.count === 1 ? 'producto' : 'productos'}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
