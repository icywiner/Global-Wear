import { ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CatalogOffer, CatalogProduct } from '@/data/catalog';
import SmartImage from '@/components/ui/SmartImage';

interface MarketplaceProductRowProps {
  product: CatalogProduct;
  offer: CatalogOffer;
  isActive: boolean;
  onSelect: (productId: string, storeKey: string) => void;
  onImageError: (productId: string) => void;
}

export default function MarketplaceProductRow({
  product,
  offer,
  isActive,
  onSelect,
  onImageError,
}: MarketplaceProductRowProps) {
  return (
    <article
      className={`rounded-3xl border bg-card p-4 md:p-5 transition-all duration-300 h-[320px] flex flex-col ${
        isActive ? 'border-primary shadow-xl ring-2 ring-primary/20' : 'border-border hover:border-primary/35 hover:shadow-lg'
      }`}
      onClick={() => onSelect(product.id, offer.storeKey)}
    >
      <div className="grid grid-cols-[132px_1fr] md:grid-cols-[168px_1fr] gap-4 h-full">
        <div className="relative rounded-2xl bg-secondary/40 overflow-hidden">
          <SmartImage
            sources={product.images}
            alt={product.name}
            onAllFailed={() => onImageError(product.id)}
            imgClassName="h-full w-full object-cover"
            skeletonClassName="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary to-secondary/60"
          />
        </div>

        <div className="min-w-0 flex flex-col h-full">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1">{product.brand}</p>
          <h3 className="text-lg md:text-xl font-semibold leading-tight text-foreground line-clamp-2 mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-foreground">
              {offer.currencySymbol}
              {offer.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">{offer.currency}</span>
          </div>

          <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5 mb-4">
            <MapPin className="w-4 h-4" />
            {offer.store} · {offer.cityName}, {offer.countryName}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2">
            <a
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Ver en tienda
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to={`/producto/${product.id}`}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary/35"
            >
              Comparar ofertas
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
