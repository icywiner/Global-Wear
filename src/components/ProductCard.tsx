import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import type { Product, StoreOffer } from '@/data/products';
import { getOffersForProduct, getBestOffer } from '@/data/products';
import { useLocation } from '@/context/LocationContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [imgError, setImgError] = useState(false);
  const { country, city } = useLocation();

  const localOffers = country && city
    ? getOffersForProduct(product.id, country.code, city.id)
    : [];
  const bestOffer = getBestOffer(product.id);
  const displayOffer = localOffers[0] || bestOffer;

  const categoryIcons: Record<string, string> = {
    zapatillas: '👟', buzos: '🧥', camperas: '🧥', jeans: '👖', remeras: '👕',
  };

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-secondary/30 overflow-hidden">
        {!imgError && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {categoryIcons[product.category] || '👕'}
          </div>
        )}

        {bestOffer && displayOffer && bestOffer.productId === product.id && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Tienda oficial
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {displayOffer ? (
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-foreground">
              {displayOffer.currencySymbol}
              {displayOffer.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {displayOffer.lastUpdated}
            </span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">No disponible</span>
        )}

        {displayOffer && (
          <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            {displayOffer.store} — {displayOffer.countryCode === country?.code ? city?.name : displayOffer.countryCode}
          </p>
        )}
      </div>
    </Link>
  );
}
