import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';
import { offers, toUSD, products } from '@/data/products';

export default function CountriesSection() {
  const { country: currentCountry, setCountry, setCity } = useLocation();

  const countryStats = useMemo(() => {
    return countries.map(c => {
      const countryOffers = offers.filter(o => o.countryCode === c.code && o.inStock);
      const productIds = new Set(countryOffers.map(o => o.productId));
      const avgPrice = countryOffers.length > 0
        ? countryOffers.reduce((sum, o) => sum + toUSD(o.price, o.currency), 0) / countryOffers.length
        : 0;

      return {
        ...c,
        productCount: productIds.size,
        offerCount: countryOffers.length,
        avgPriceUSD: avgPrice,
      };
    });
  }, []);

  const cheapest = countryStats.reduce((a, b) => a.avgPriceUSD < b.avgPriceUSD && a.avgPriceUSD > 0 ? a : b);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Países Disponibles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {countryStats.map((c, i) => {
            const isActive = currentCountry?.code === c.code;
            const isCheapest = c.code === cheapest.code;

            return (
              <motion.button
                key={c.code}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => {
                  setCountry(c);
                  setCity(c.cities[0]);
                }}
                className={`relative text-left bg-card border rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group ${
                  isActive ? 'border-primary shadow-md' : 'border-border hover:border-primary/30'
                }`}
              >
                {isCheapest && (
                  <span className="absolute -top-2.5 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Precios más bajos
                  </span>
                )}

                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{c.flag}</span>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {c.cities.map(ci => ci.name).join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span><strong className="text-foreground">{c.productCount}</strong> productos</span>
                    <span><strong className="text-foreground">{c.currency}</strong></span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
