import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '@/context/LocationContext';
import { getProductsForLocation, type Category, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const ITEMS_PER_PAGE = 20;

export default function ProductsGrid() {
  const { country, city } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const availableProducts = useMemo(
    () => country && city ? getProductsForLocation(country.code, city.id, selectedCategory || undefined) : [],
    [country?.code, city?.id, selectedCategory]
  );

  const shownProducts = availableProducts.slice(0, visibleCount);
  const hasMore = visibleCount < availableProducts.length;

  return (
    <section className="py-8 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Productos en {country?.flag} {country?.name}
          </h2>
          <span className="text-sm text-muted-foreground">
            {availableProducts.length} productos
          </span>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          <button
            onClick={() => { setSelectedCategory(null); setVisibleCount(ITEMS_PER_PAGE); }}
            className={`shrink-0 text-sm font-medium px-5 py-2.5 rounded-full transition-colors ${
              !selectedCategory
                ? 'bg-foreground text-background'
                : 'bg-card border border-border text-foreground hover:border-primary/40'
            }`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className={`shrink-0 text-sm font-medium px-5 py-2.5 rounded-full transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-foreground text-background'
                  : 'bg-card border border-border text-foreground hover:border-primary/40'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {shownProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {shownProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.3) }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                  className="px-8 py-3 bg-card border border-border text-foreground rounded-full text-sm font-medium hover:border-primary/40 hover:shadow-md transition-all"
                >
                  Cargar más productos
                </button>
              </div>
            )}
          </>
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
