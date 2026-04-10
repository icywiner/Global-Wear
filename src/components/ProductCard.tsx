import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin } from 'lucide-react';
import type { Product } from '@/data/products';
import { getOffersForProduct, getBestOffer, toUSD } from '@/data/products';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { country, city } = useLocation();

  const localOffers = country && city
    ? getOffersForProduct(product.id, country.code, city.id)
    : [];
  const bestOffer = getBestOffer(product.id);
  const displayOffer = localOffers[0] || bestOffer;

  if (imgError || !displayOffer) return null;

  const isBestGlobal = bestOffer && displayOffer && toUSD(displayOffer.price, displayOffer.currency) <= toUSD(bestOffer.price, bestOffer.currency) + 0.01;

  const getCityName = (countryCode: string, cityId: string) =>
    countries.find(c => c.code === countryCode)?.cities.find(ci => ci.id === cityId)?.name || cityId;

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-secondary/20 overflow-hidden">
        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-secondary/40 animate-pulse" />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isBestGlobal && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Mejor precio
            </span>
          )}
        </div>

        {/* Verified */}
        <div className="absolute top-2 right-2">
          <span className="bg-card/90 backdrop-blur-sm text-primary text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
            <ShieldCheck className="w-3 h-3" />
          </span>
        </div>

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
      </div>
    </Link>
  );
}
