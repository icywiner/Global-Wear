import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';

export default function BackButton({ label = 'Volver', className = '' }: { label?: string; className?: string }) {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (routerLocation.pathname === '/') return null;

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={label}
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 sm:px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/45 hover:text-primary ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

