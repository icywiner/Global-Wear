import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { getProductsForLocation, products } from '@/data/products';

const brandStyles: Record<string, { bg: string; text: string }> = {
  Nike: { bg: 'bg-gradient-to-br from-orange-500 to-red-500', text: 'text-white' },
  Adidas: { bg: 'bg-gradient-to-br from-blue-500 to-indigo-600', text: 'text-white' },
  "Levi's": { bg: 'bg-gradient-to-br from-red-600 to-red-800', text: 'text-white' },
  Converse: { bg: 'bg-gradient-to-br from-red-400 to-pink-500', text: 'text-white' },
  Vans: { bg: 'bg-gradient-to-br from-gray-700 to-gray-900', text: 'text-white' },
  Champion: { bg: 'bg-gradient-to-br from-blue-600 to-blue-800', text: 'text-white' },
  'The North Face': { bg: 'bg-gradient-to-br from-gray-600 to-gray-800', text: 'text-white' },
  'New Balance': { bg: 'bg-gradient-to-br from-gray-500 to-gray-700', text: 'text-white' },
  Puma: { bg: 'bg-gradient-to-br from-emerald-500 to-emerald-700', text: 'text-white' },
};

export default function BrandsSection() {
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

  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            Marcas Oficiales
          </h2>
          <Link to="/explorar" className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand, i) => {
            const style = brandStyles[brand.name] || { bg: 'bg-gradient-to-br from-primary/60 to-primary', text: 'text-white' };
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="shrink-0"
              >
                <Link
                  to={`/explorar?marca=${encodeURIComponent(brand.name)}`}
                  className="group flex flex-col items-center gap-2 w-[100px]"
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${style.bg} flex items-center justify-center ${style.text} text-sm font-bold shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
                    {brand.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-foreground leading-tight truncate w-full">
                      {brand.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {brand.count} {brand.count === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
