import { useLocation } from '@/context/LocationContext';
import LocationPicker from '@/components/home/LocationPicker';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import ProductCarousel from '@/components/home/ProductCarousel';
import BrandsGrid from '@/components/home/BrandsGrid';
import CountriesSection from '@/components/home/CountriesSection';
import ProductsGrid from '@/components/home/ProductsGrid';

export default function Home() {
  const { country, city } = useLocation();

  if (!country || !city) {
    return <LocationPicker />;
  }

  return (
    <div>
      <HeroSection />
      <StatsBar />
      <ProductCarousel />
      <BrandsGrid />
      <CountriesSection />
      <ProductsGrid />
    </div>
  );
}
