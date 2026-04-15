import { countries } from '@/data/locations';
import {
  categories,
  offers as seedOffers,
  products as seedProducts,
  toUSD,
  type Category,
  type Product,
  type StoreOffer,
} from '@/data/products';

export { categories };
export type { Category };
export { toUSD };

export interface CatalogProduct extends Product {
  popularity: number;
  seedProductId: string;
}

export interface CatalogOffer extends StoreOffer {
  storeKey: string;
  latitude: number;
  longitude: number;
  cityName: string;
  countryName: string;
  countryFlag: string;
}

export interface StorePoint {
  storeKey: string;
  store: string;
  countryCode: string;
  cityId: string;
  countryName: string;
  cityName: string;
  countryFlag: string;
  latitude: number;
  longitude: number;
  productsCount: number;
  minPriceUSD: number;
  maxPriceUSD: number;
}

const CITY_CENTERS: Record<string, { lat: number; lng: number }> = {
  nyc: { lat: 40.7128, lng: -74.0060 },
  la: { lat: 34.0522, lng: -118.2437 },
  mad: { lat: 40.4168, lng: -3.7038 },
  bcn: { lat: 41.3851, lng: 2.1734 },
  bue: { lat: -34.6037, lng: -58.3816 },
  cor: { lat: -31.4201, lng: -64.1888 },
};

const VARIANT_DEFINITIONS = [
  { suffix: '', multiplier: 1, popularityBoost: 100 },
  { suffix: 'Core', multiplier: 0.97, popularityBoost: 90 },
  { suffix: 'Studio', multiplier: 1.04, popularityBoost: 82 },
];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidImageUrl(image?: string): boolean {
  if (!image || !isValidHttpUrl(image)) return false;
  return !image.includes('IMAGE+UNAVAILABLE');
}

function stablePrice(price: number, multiplier: number): number {
  const adjusted = price * multiplier;
  if (price > 999) return Math.round(adjusted);
  return Math.round(adjusted * 100) / 100;
}

function getCityName(countryCode: string, cityId: string): string {
  return countries.find((country) => country.code === countryCode)?.cities.find((city) => city.id === cityId)?.name || cityId;
}

function getCountryName(countryCode: string): string {
  return countries.find((country) => country.code === countryCode)?.name || countryCode;
}

function getCountryFlag(countryCode: string): string {
  return countries.find((country) => country.code === countryCode)?.flag || '';
}

function getStoreCoordinates(storeKey: string, cityId: string): { latitude: number; longitude: number } {
  const center = CITY_CENTERS[cityId];
  const baseHash = hashString(storeKey);

  if (!center) {
    return { latitude: 0, longitude: 0 };
  }

  const latOffset = ((baseHash % 200) - 100) * 0.00045;
  const lngOffset = (((Math.floor(baseHash / 13)) % 200) - 100) * 0.00045;

  return {
    latitude: center.lat + latOffset,
    longitude: center.lng + lngOffset,
  };
}

const variantProducts: CatalogProduct[] = [];
const seedToVariants = new Map<string, Array<{ variantId: string; multiplier: number }>>();

seedProducts.forEach((seedProduct) => {
  const variants = VARIANT_DEFINITIONS.map((variant, index) => {
    const variantId = index === 0 ? seedProduct.id : `${seedProduct.id}-${variant.suffix.toLowerCase()}`;
    const popularity = variant.popularityBoost + (hashString(variantId) % 40);

    const product: CatalogProduct = {
      ...seedProduct,
      id: variantId,
      name: variant.suffix ? `${seedProduct.name} ${variant.suffix}` : seedProduct.name,
      description: variant.suffix
        ? `${seedProduct.description} Edicion ${variant.suffix.toLowerCase()} con stock internacional.`
        : seedProduct.description,
      popularity,
      seedProductId: seedProduct.id,
    };

    variantProducts.push(product);
    return { variantId, multiplier: variant.multiplier };
  });

  seedToVariants.set(seedProduct.id, variants);
});

const variantOffers: CatalogOffer[] = [];

seedOffers.forEach((seedOffer) => {
  const variants = seedToVariants.get(seedOffer.productId) || [];

  variants.forEach((variant) => {
    const storeKey = `${seedOffer.store}|${seedOffer.countryCode}|${seedOffer.cityId}`;
    const coords = getStoreCoordinates(storeKey, seedOffer.cityId);

    const offer: CatalogOffer = {
      ...seedOffer,
      productId: variant.variantId,
      price: stablePrice(seedOffer.price, variant.multiplier),
      storeKey,
      latitude: coords.latitude,
      longitude: coords.longitude,
      cityName: getCityName(seedOffer.countryCode, seedOffer.cityId),
      countryName: getCountryName(seedOffer.countryCode),
      countryFlag: getCountryFlag(seedOffer.countryCode),
    };

    variantOffers.push(offer);
  });
});

const validOfferProductIds = new Set(
  variantOffers
    .filter((offer) => offer.price > 0 && Boolean(offer.store) && isValidHttpUrl(offer.url) && offer.inStock)
    .map((offer) => offer.productId)
);

export const catalogProducts: CatalogProduct[] = variantProducts.filter(
  (product) => isValidImageUrl(product.images[0]) && validOfferProductIds.has(product.id)
);

export const catalogOffers: CatalogOffer[] = variantOffers.filter(
  (offer) =>
    offer.price > 0
    && Boolean(offer.store)
    && isValidHttpUrl(offer.url)
    && offer.inStock
    && catalogProducts.some((product) => product.id === offer.productId)
);

const catalogProductSet = new Set(catalogProducts.map((product) => product.id));

export function getCatalogProductsForLocation(countryCode: string, cityId: string, category?: Category): CatalogProduct[] {
  const locationIds = new Set(
    catalogOffers
      .filter((offer) => offer.countryCode === countryCode && offer.cityId === cityId && catalogProductSet.has(offer.productId))
      .map((offer) => offer.productId)
  );

  return catalogProducts.filter((product) => {
    if (!locationIds.has(product.id)) return false;
    if (category && product.category !== category) return false;
    return true;
  });
}

export function getCatalogOffersForProduct(productId: string, countryCode?: string, cityId?: string): CatalogOffer[] {
  return catalogOffers
    .filter((offer) => {
      if (offer.productId !== productId) return false;
      if (countryCode && offer.countryCode !== countryCode) return false;
      if (cityId && offer.cityId !== cityId) return false;
      return true;
    })
    .sort((a, b) => toUSD(a.price, a.currency) - toUSD(b.price, b.currency));
}

export function getCatalogBestOffer(productId: string): CatalogOffer | null {
  const offers = getCatalogOffersForProduct(productId);
  return offers.length > 0 ? offers[0] : null;
}

export function getStorePoints(countryCode: string, cityId: string, productIds?: string[]): StorePoint[] {
  const filteredOffers = catalogOffers.filter((offer) => {
    if (offer.countryCode !== countryCode || offer.cityId !== cityId) return false;
    if (productIds && productIds.length > 0 && !productIds.includes(offer.productId)) return false;
    return true;
  });

  const stores = new Map<string, StorePoint>();

  filteredOffers.forEach((offer) => {
    const existing = stores.get(offer.storeKey);
    const usd = toUSD(offer.price, offer.currency);

    if (!existing) {
      stores.set(offer.storeKey, {
        storeKey: offer.storeKey,
        store: offer.store,
        countryCode: offer.countryCode,
        cityId: offer.cityId,
        countryName: offer.countryName,
        cityName: offer.cityName,
        countryFlag: offer.countryFlag,
        latitude: offer.latitude,
        longitude: offer.longitude,
        productsCount: 1,
        minPriceUSD: usd,
        maxPriceUSD: usd,
      });
      return;
    }

    existing.productsCount += 1;
    existing.minPriceUSD = Math.min(existing.minPriceUSD, usd);
    existing.maxPriceUSD = Math.max(existing.maxPriceUSD, usd);
  });

  return [...stores.values()];
}

export function getCatalogSuggestions(countryCode: string, cityId: string): string[] {
  const items = getCatalogProductsForLocation(countryCode, cityId);
  const suggestions = new Set<string>();

  items.forEach((product) => {
    suggestions.add(product.name);
    suggestions.add(product.brand);
  });

  return [...suggestions].sort((a, b) => a.localeCompare(b));
}

export function getCatalogStats() {
  const storeCount = new Set(catalogOffers.map((offer) => offer.storeKey)).size;
  const cityCount = new Set(catalogOffers.map((offer) => `${offer.countryCode}|${offer.cityId}`)).size;

  return {
    products: catalogProducts.length,
    offers: catalogOffers.length,
    stores: storeCount,
    cities: cityCount,
  };
}
