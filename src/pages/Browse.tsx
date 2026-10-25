import { Navigate, useLocation as useRouterLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from '@/context/LocationContext';
import ProductsGrid from '@/components/home/ProductsGrid';

export default function Browse() {
  const { country, city } = useLocation();
  const routerLocation = useRouterLocation();
  const [searchParams] = useSearchParams();
  const hasQuery = Boolean((searchParams.get('q') || '').trim() || (searchParams.get('marca') || '').trim());

  useEffect(() => {
    if (routerLocation.hash !== '#products') return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById('products');
      if (!target) return;

      const navbarOffset = 96;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [routerLocation.hash, routerLocation.search]);

  if ((!country || !city) && !hasQuery) return <Navigate to="/" replace />;

  return <ProductsGrid />;
}
