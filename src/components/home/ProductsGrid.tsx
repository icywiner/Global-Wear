import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '@/context/LocationContext';
import { getProductsForLocation, type Category, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductsGrid() {
  const { country, city } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const availableProducts = useMemo(
    () => country && city ? getProductsForLocation(country.code, city.id, selectedCategory || undefined) : [],
    [country?.code, city?.id, selectedCategory]
  );

  return (
    <section className="py-6 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            Productos en {country?.flag} {country?.name}
          </h2>
          <span className="text-xs text-muted-foreground">
            {availableProducts.length} productos
          </span>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 text-xs font-medium px-4 py-2 rounded-full transition-colors ${
              !selectedCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`shrink-0 text-xs font-medium px-4 py-2 rounded-full transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {availableProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {availableProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-base font-semibold text-foreground mb-1">No hay productos disponibles</h3>
            <p className="text-sm text-muted-foreground">
              {selectedCategory
                ? 'No se encontraron productos en esta categoría.'
                : `No hay productos en ${city?.name}.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
