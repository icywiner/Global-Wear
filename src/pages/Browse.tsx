import { Navigate } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import ProductsGrid from '@/components/home/ProductsGrid';

export default function Browse() {
  const { country, city } = useLocation();

  if (!country || !city) return <Navigate to="/" replace />;

  return <ProductsGrid />;
}
