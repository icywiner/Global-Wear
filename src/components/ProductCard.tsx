import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Product } from '@/data/products';
import { getOffersForProduct, getBestOffer, toUSD } from '@/data/products';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';
import SmartImage from '@/components/ui/SmartImage';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [imgError, setImgError] = useState(false);
  const { country, city } = useLocation();

  const localOffers = country && city
    ? getOffersForProduct(product.id, country.code, city.id)
    : [];
  const validLocalOffers = localOffers.filter((o) => Boolean(o.price) && Boolean(o.store) && Boolean(o.url));
  const displayOffer = validLocalOffers[0] || getBestOffer(product.id);

  const hasRequiredData = Boolean(
    product.images?.[0] &&
    displayOffer?.price &&
    displayOffer?.store &&
    displayOffer?.url
  );

  if (imgError || !displayOffer || !hasRequiredData) return null;

  const getCityName = (countryCode: string, cityId: string) =>
    countries.find(c => c.code === countryCode)?.cities.find(ci => ci.id === cityId)?.name || cityId;

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/25 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <SmartImage
          sources={product.images}
          alt={product.name}
          onAllFailed={() => setImgError(true)}
          imgClassName="w-full h-full object-contain p-4 group-hover:scale-105"
          skeletonClassName="absolute inset-0 bg-secondary/40 animate-pulse"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <span className="text-xs font-semibold bg-primary text-primary-foreground px-5 py-2 rounded-full shadow-lg">
            Ver producto
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-lg font-bold text-foreground">
            {displayOffer.currencySymbol}{displayOffer.price.toLocaleString()}
          </span>
          {displayOffer.currency !== 'USD' && (
            <span className="text-[10px] text-muted-foreground">
              ≈ ${toUSD(displayOffer.price, displayOffer.currency).toFixed(0)} USD
            </span>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5" />
          {displayOffer.store} · {getCityName(displayOffer.countryCode, displayOffer.cityId)}
        </p>

        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center justify-center text-xs font-semibold rounded-lg bg-foreground text-background px-3 py-1.5">
            Comprar ahora
          </span>
        </div>
      </div>
    </Link>
  );
}
