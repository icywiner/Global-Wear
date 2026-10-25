import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Category } from '@/data/products';
import { categories } from '@/data/products';
import { useLocation } from '@/context/LocationContext';
import LocationPicker from '@/components/home/LocationPicker';
import HeroSection from '@/components/home/HeroSection';
import BrandsSection from '@/components/home/BrandsSection';
import CategoriesSection from '@/components/home/CategoriesSection';

export default function Home() {
  const { country, city } = useLocation();
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [pendingCategory, setPendingCategory] = useState<Category | null>(() => {
    const category = new URLSearchParams(window.location.search).get('categoria') as Category | null;
    return category && categories.some((item) => item.id === category) ? category : null;
  });

  useEffect(() => {
    if (!pendingCategory || selectedBrand) return;
    scrollToSection('brands');
  }, [pendingCategory, selectedBrand]);

  const scrollToSection = (id: 'brands' | 'categories') => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    scrollToSection('categories');
  };

  const handleCategorySelect = (category: Category) => {
    if (!selectedBrand) {
      setPendingCategory(category);
      scrollToSection('brands');
      return;
    }

    setPendingCategory(null);
    navigate(`/productos?marca=${encodeURIComponent(selectedBrand)}&categoria=${category}#products`);
  };

  if (!country || !city) {
    return <LocationPicker />;
  }

  return (
    <div className="bg-background">
      <HeroSection />
      <BrandsSection onBrandSelect={handleBrandSelect} />
      <CategoriesSection onCategorySelect={handleCategorySelect} />
    </div>
  );
}
