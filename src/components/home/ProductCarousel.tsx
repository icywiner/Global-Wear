import { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingDown, ShieldCheck, MapPin } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { products, offers, getBestOffer, toUSD } from '@/data/products';
import { countries } from '@/data/locations';

interface FeaturedProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  bestPrice: number;
  bestCurrency: string;
  bestCurrencySymbol: string;
  bestStore: string;
  bestCountry: string;
  bestCity: string;
  priceSpread: number; // % difference between cheapest and most expensive
}

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { country, city } = useLocation();

  const featured: FeaturedProduct[] = useMemo(() => {
    return products
      .map(p => {
        const best = getBestOffer(p.id);
        if (!best) return null;

        const allOffers = offers.filter(o => o.productId === p.id && o.inStock);
        const prices = allOffers.map(o => toUSD(o.price, o.currency));
        const max = Math.max(...prices);
        const min = Math.min(...prices);
        const spread = max > 0 ? Math.round(((max - min) / max) * 100) : 0;

        const bestCountry = countries.find(c => c.code === best.countryCode);
        const bestCityName = bestCountry?.cities.find(ci => ci.id === best.cityId)?.name || best.cityId;

        return {
          id: p.id,
          name: p.name,
          brand: p.brand,
          image: p.images[0],
          bestPrice: best.price,
          bestCurrency: best.currency,
          bestCurrencySymbol: best.currencySymbol,
          bestStore: best.store,
          bestCountry: bestCountry?.name || best.countryCode,
          bestCity: bestCityName,
          priceSpread: spread,
        } as FeaturedProduct;
      })
      .filter((f): f is FeaturedProduct => f !== null && f.priceSpread > 0)
      .sort((a, b) => b.priceSpread - a.priceSpread)
      .slice(0, 8);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (featured.length === 0) return null;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Mejores Oportunidades
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Productos con mayor diferencia de precio entre países</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="snap-start"
            >
              <Link
                to={`/producto/${item.id}`}
                className="group flex-shrink-0 w-[280px] bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-square bg-secondary/10 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                      Ahorrá hasta {item.priceSpread}%
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-accent/10 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verificado
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                    {item.brand}
                  </p>
                  <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-lg font-bold text-foreground">
                      {item.bestCurrencySymbol}{item.bestPrice.toLocaleString()}
                    </span>
                    {item.bestCurrency !== 'USD' && (
                      <span className="text-xs text-muted-foreground">
                        ${toUSD(item.bestPrice, item.bestCurrency).toFixed(2)} USD
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.bestStore} · {item.bestCountry}
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
