import { Navigate, useSearchParams } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import ProductsGrid from '@/components/home/ProductsGrid';

export default function Browse() {
  const { country, city } = useLocation();
  const [searchParams] = useSearchParams();
  const hasQuery = Boolean((searchParams.get('q') || '').trim());

  if ((!country || !city) && !hasQuery) return <Navigate to="/" replace />;

  return <ProductsGrid />;
}
