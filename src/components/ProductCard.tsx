import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, Clock, MapPin } from 'lucide-react';
import type { Product } from '@/data/products';
import { getOffersForProduct, getBestOffer, toUSD } from '@/data/products';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';

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

  // Hide product if image fails to load
  if (imgError) return null;

  // Hide product if no offer
  if (!displayOffer) return null;

  const isBestGlobal = bestOffer && displayOffer && toUSD(displayOffer.price, displayOffer.currency) <= toUSD(bestOffer.price, bestOffer.currency) + 0.01;

  const getCityName = (countryCode: string, cityId: string) =>
    countries.find(c => c.code === countryCode)?.cities.find(ci => ci.id === cityId)?.name || cityId;

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-secondary/20 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {isBestGlobal && bestOffer && (
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              Mejor precio global
            </span>
          )}
          <span className="bg-accent/10 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Verificado
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
          {product.brand}
        </p>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg font-bold text-foreground">
            {displayOffer.currencySymbol}
            {displayOffer.price.toLocaleString()}
          </span>
          {displayOffer.currency !== 'USD' && (
            <span className="text-xs text-muted-foreground">
              ${toUSD(displayOffer.price, displayOffer.currency).toFixed(2)} USD
            </span>
          )}
        </div>

        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {displayOffer.store} · {displayOffer.countryCode} · {getCityName(displayOffer.countryCode, displayOffer.cityId)}
        </p>
        <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
          <Clock className="w-2.5 h-2.5" />
          Hace {getTimeAgo(displayOffer.lastUpdated)}
        </p>
      </div>
    </Link>
  );
}

function getTimeAgo(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return 'menos de 1h';
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
