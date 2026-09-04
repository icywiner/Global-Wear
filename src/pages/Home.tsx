import { useLocation } from '@/context/LocationContext';
import LocationPicker from '@/components/home/LocationPicker';
import HeroSection from '@/components/home/HeroSection';
import BrandsSection from '@/components/home/BrandsSection';
import CategoriesSection from '@/components/home/CategoriesSection';

export default function Home() {
  const { country, city } = useLocation();

  if (!country || !city) {
    return <LocationPicker />;
  }

  return (
    <div className="bg-background">
      <HeroSection />
      <BrandsSection />
      <CategoriesSection />
    </div>
  );
}
