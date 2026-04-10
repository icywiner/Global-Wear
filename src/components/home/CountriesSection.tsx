import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';
import { offers, toUSD } from '@/data/products';

export default function CountriesSection() {
  const { country: current, setCountry, setCity } = useLocation();

  const stats = useMemo(() =>
    countries.map(c => {
      const co = offers.filter(o => o.countryCode === c.code && o.inStock);
      const ids = new Set(co.map(o => o.productId));
      const avg = co.length > 0 ? co.reduce((s, o) => s + toUSD(o.price, o.currency), 0) / co.length : 0;
      return { ...c, productCount: ids.size, avgUSD: avg };
    })
  , []);

  const cheapest = stats.reduce((a, b) => a.avgUSD < b.avgUSD && a.avgUSD > 0 ? a : b);

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">
          Países Disponibles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats.map((c, i) => {
            const isActive = current?.code === c.code;
            const isCheap = c.code === cheapest.code;
            return (
              <motion.button
                key={c.code}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => { setCountry(c); setCity(c.cities[0]); }}
                className={`relative text-left bg-card border rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group ${
                  isActive ? 'border-primary shadow-md ring-1 ring-primary/20' : 'border-border hover:border-primary/30'
                }`}
              >
                {isCheap && (
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
