import type { Category } from '@/data/products';

export interface ProfileDoc {
  displayName: string;
  role: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDoc {
  id: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  images: string[];
  officialBrand: boolean;
  officialProductUrl: string | null;
  officialImageUrl: string | null;
  priceSourceUrl: string | null;
  priceCheckedAt: string | null;
  country: string | null;
  city: string | null;
  updatedAt: string;
}

export interface OfferDoc {
  id: string;
  productId: string;
  store: string;
  storeType: 'oficial' | 'autorizado';
  countryCode: string;
  cityId: string;
  price: number;
  currency: string;
  currencySymbol: string;
  url: string;
  inStock: boolean;
  lastUpdated: string | null;
  isVerified: boolean;
  storeAddress: string | null;
  storeSourceUrl: string | null;
  physicalStockVerified: boolean;
}

export interface CatalogSyncErrorDoc {
  productId: string;
  country: string | null;
  reason: string | null;
  message: string | null;
  details: Record<string, unknown> | null;
  createdAt: string;
}

export interface CountryDoc {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  cities: Array<{ id: string; name: string }>;
}
