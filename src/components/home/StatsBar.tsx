import { motion } from 'framer-motion';
import { Globe, ShoppingBag, Tag, ShieldCheck } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';
import { getProductsForLocation, getAllBrands } from '@/data/products';

export default function StatsBar() {
  const { country, city } = useLocation();

  const totalProducts = country && city ? getProductsForLocation(country.code, city.id).length : 0;
  const allBrands = getAllBrands();

  const stats = [
    { icon: <Globe className="w-5 h-5" />, value: countries.length.toString(), label: 'Países', color: 'text-primary' },
    { icon: <ShoppingBag className="w-5 h-5" />, value: `${totalProducts}+`, label: 'Productos', color: 'text-accent' },
    { icon: <Tag className="w-5 h-5" />, value: allBrands.length.toString(), label: 'Marcas', color: 'text-warning' },
    { icon: <ShieldCheck className="w-5 h-5" />, value: '100%', label: 'Verificado', color: 'text-success' },
  ];

  return (
    <section className="py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-sm transition-shadow"
            >
              <div className={`flex justify-center mb-1.5 ${stat.color}`}>{stat.icon}</div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
