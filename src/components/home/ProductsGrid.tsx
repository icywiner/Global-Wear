import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { getProductsForLocation, type Category } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CategoryFilters from './CategoryFilters';

export default function ProductsGrid() {
  const { country, city } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const availableProducts = useMemo(
    () => country && city ? getProductsForLocation(country.code, city.id, selectedCategory || undefined) : [],
    [country?.code, city?.id, selectedCategory]
  );

  return (
    <section className="py-10 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Productos en {country?.flag} {country?.name}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Precios de tiendas oficiales verificadas con enlaces directos.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <CategoryFilters selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {availableProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-semibold text-foreground mb-1">No hay productos disponibles</h3>
            <p className="text-sm text-muted-foreground">
              {selectedCategory
                ? 'No se encontraron productos en esta categoría. Probá otra.'
                : `No hay productos en ${city?.name}. Probá cambiando de ciudad.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
