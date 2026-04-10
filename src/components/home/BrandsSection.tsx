import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { getProductsForLocation, products } from '@/data/products';

const brandLogos: Record<string, string> = {
  Nike: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
  Adidas: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
  "Levi's": 'https://upload.wikimedia.org/wikipedia/commons/7/75/Levi%27s_logo.svg',
  Converse: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg',
  Vans: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Vans-logo.svg',
  'The North Face': 'https://upload.wikimedia.org/wikipedia/commons/e/e9/The_North_Face_Logo.svg',
  'New Balance': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg',
  Puma: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg',
  Champion: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Champion_Athleticwear_logo.svg',
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
      .map(([name, count]) => ({ name, count, logo: brandLogos[name] }))
      .sort((a, b) => b.count - a.count);
  }, [country?.code, city?.id]);

  if (brands.length === 0) return null;

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Marcas Oficiales
          </h2>
          <Link to="/explorar" className="text-sm text-primary font-medium hover:underline flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link
                to={`/explorar?marca=${encodeURIComponent(brand.name)}`}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-full aspect-square max-w-[90px] bg-card border border-border rounded-2xl flex items-center justify-center p-4 shadow-sm group-hover:shadow-md group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={e => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                          const span = document.createElement('span');
                          span.className = 'text-sm font-bold text-foreground';
                          span.textContent = brand.name.substring(0, 3).toUpperCase();
                          parent.appendChild(span);
                        }
                      }}
                    />
                  ) : (
                    <span className="text-sm font-bold text-foreground">
                      {brand.name.substring(0, 3).toUpperCase()}
                    </span>
                  )}
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
          ))}
        </div>
      </div>
    </section>
  );
}
