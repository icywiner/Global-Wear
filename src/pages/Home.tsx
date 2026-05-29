import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { useBrand } from '@/context/BrandContext';
import LocationPicker from '@/components/home/LocationPicker';
import HeroSection from '@/components/home/HeroSection';
import BrandsSection from '@/components/home/BrandsSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import ProductsGrid from '@/components/home/ProductsGrid';

export default function Home() {
  const { country, city, resetLocation } = useLocation();
  const { selectedBrand, selectBrand } = useBrand();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [highlightCategories, setHighlightCategories] = useState(false);

  useEffect(() => {
    if (!selectedBrand) {
      setHighlightCategories(false);
      return;
    }

    setHighlightCategories(true);

    const frame = window.requestAnimationFrame(() => {
      categoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const timeout = window.setTimeout(() => {
      setHighlightCategories(false);
    }, 900);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [selectedBrand]);

  if (!country || !city) {
    return <LocationPicker />;
  }

  return (
    <div className="bg-background">
      <button
        type="button"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });

          if (selectedBrand) {
            selectBrand(null);
            return;
          }

          resetLocation();
        }}
        className="fixed left-4 top-24 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl md:left-6"
        aria-label={selectedBrand ? 'Volver a marcas' : 'Volver a selección de ciudad'}
        title={selectedBrand ? 'Volver a marcas' : 'Volver a selección de ciudad'}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedBrand ? 'Volver' : 'Ubicación'}</span>
      </button>
      <HeroSection />
      <BrandsSection />
      {selectedBrand && (
        <div ref={categoriesRef}>
          <CategoriesSection isHighlighted={highlightCategories} />
        </div>
      )}
      {selectedBrand && <ProductsGrid />}
    </div>
  );
}
