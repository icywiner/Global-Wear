import { useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import {
  products,
  offers,
  getOffersForProduct,
  getBestOffer,
  toUSD,
  type StoreOffer,
} from '@/data/products';
import { countries } from '@/data/locations';
import {
  ExternalLink,
  ShieldCheck,
  Clock,
  ArrowLeft,
  MapPin,
  Globe,
  ChevronRight,
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { country, city } = useLocation();
  const [imgError, setImgError] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  const product = products.find(p => p.id === id);
  if (!product) return <Navigate to="/" replace />;

  const localOffers = country && city
    ? getOffersForProduct(product.id, country.code, city.id)
    : [];

  const allOffers = offers
    .filter(o => o.productId === product.id && o.inStock)
    .sort((a, b) => toUSD(a.price, a.currency) - toUSD(b.price, b.currency));

  const bestGlobal = getBestOffer(product.id);

  const categoryIcons: Record<string, string> = {
    zapatillas: '👟', buzos: '🧥', camperas: '🧥', jeans: '👖', remeras: '👕',
  };

  const getCountryName = (code: string) =>
    countries.find(c => c.code === code)?.name || code;
  const getCityName = (countryCode: string, cityId: string) =>
    countries.find(c => c.code === countryCode)?.cities.find(ci => ci.id === cityId)?.name || cityId;
  const getCountryFlag = (code: string) =>
    countries.find(c => c.code === code)?.flag || '';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Link
        to="/explorar"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a productos
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="bg-secondary/30 rounded-2xl aspect-square overflow-hidden mb-3">
            {!imgError && product.images[selectedImg] ? (
              <img
                src={product.images[selectedImg]}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                {categoryIcons[product.category] || '👕'}
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedImg(i);
                    setImgError(false);
                  }}
                  className={`w-16 h-16 rounded-lg bg-secondary/30 overflow-hidden border-2 transition-colors ${
                    selectedImg === i ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain p-1"
                    onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'Space Grotesk' }}>
            {product.name}
          </h1>
          <p className="text-muted-foreground text-sm mb-6">{product.description}</p>

          {/* Local price */}
          {localOffers.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-5 mb-4">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Precio en {city?.name}, {country?.name}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  {localOffers[0].currencySymbol}
                  {localOffers[0].price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  {localOffers[0].currency}
                </span>
              </div>
              <a
                href={localOffers[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                Ver en {localOffers[0].store}
              </a>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Actualizado: {localOffers[0].lastUpdated}
              </p>
            </div>
          )}

          {localOffers.length === 0 && country && city && (
            <div className="bg-warning/10 border border-warning/30 rounded-xl p-5 mb-4">
              <p className="text-sm text-foreground font-medium mb-1">
                No disponible en {city.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Este producto no tiene tienda oficial en tu ciudad. Consultá las opciones en otros países.
              </p>
            </div>
          )}

          {/* Best global */}
          {bestGlobal && (
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Mejor precio global
              </p>
              <p className="font-bold text-foreground">
                {bestGlobal.currencySymbol}{bestGlobal.price.toLocaleString()}{' '}
                <span className="text-sm font-normal text-muted-foreground">
                  en {bestGlobal.store} — {getCityName(bestGlobal.countryCode, bestGlobal.cityId)}, {getCountryName(bestGlobal.countryCode)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* All official stores */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk' }}>
          <ShieldCheck className="w-5 h-5 text-accent" />
          Disponible en tiendas oficiales
        </h2>
        <div className="space-y-3">
          {allOffers.map((offer, i) => (
            <OfferRow
              key={i}
              offer={offer}
              isBest={bestGlobal?.countryCode === offer.countryCode && bestGlobal?.cityId === offer.cityId}
              countryName={getCountryName(offer.countryCode)}
              cityName={getCityName(offer.countryCode, offer.cityId)}
              flag={getCountryFlag(offer.countryCode)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function OfferRow({
  offer,
  isBest,
  countryName,
  cityName,
  flag,
}: {
  offer: StoreOffer;
  isBest: boolean;
  countryName: string;
  cityName: string;
  flag: string;
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between bg-card border rounded-xl p-4 gap-3 ${
        isBest ? 'border-accent/40 bg-accent/5' : 'border-border'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{flag}</span>
        <div>
          <p className="font-semibold text-foreground text-sm flex items-center gap-2">
            {offer.store}
            {isBest && (
              <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                MEJOR PRECIO
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {cityName}, {countryName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold text-foreground">
            {offer.currencySymbol}{offer.price.toLocaleString()}
          </p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {offer.lastUpdated}
          </p>
        </div>
        <a
          href={offer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Ver en tienda
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
