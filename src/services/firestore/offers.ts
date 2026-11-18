import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
  type QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { COLLECTIONS } from '@/integrations/firebase/collections';
import type { OfferDoc } from '@/integrations/firebase/types';
import type { StoreOffer } from '@/data/products';
import { buildOfferId, chunkArray } from './helpers';

function offersCol() {
  return collection(db, COLLECTIONS.offers);
}

export function offerToDoc(offer: StoreOffer): OfferDoc {
  const id = buildOfferId(offer);
  return {
    id,
    productId: offer.productId,
    store: offer.store,
    storeType: offer.storeType,
    countryCode: offer.countryCode,
    cityId: offer.cityId,
    price: offer.price,
    currency: offer.currency,
    currencySymbol: offer.currencySymbol,
    url: offer.url,
    inStock: offer.inStock,
    lastUpdated: offer.lastUpdated ?? null,
    isVerified: offer.isVerified ?? false,
    storeAddress: offer.storeAddress ?? null,
    storeSourceUrl: offer.storeSourceUrl ?? null,
    physicalStockVerified: offer.physicalStockVerified ?? false,
  };
}

export function offerFromDoc(data: OfferDoc): StoreOffer {
  return {
    productId: data.productId,
    store: data.store,
    storeType: data.storeType,
    countryCode: data.countryCode,
    cityId: data.cityId,
    price: data.price,
    currency: data.currency,
    currencySymbol: data.currencySymbol,
    url: data.url,
    inStock: data.inStock,
    lastUpdated: data.lastUpdated || new Date().toISOString(),
    isVerified: data.isVerified,
    storeAddress: data.storeAddress ?? undefined,
    storeSourceUrl: data.storeSourceUrl ?? undefined,
    physicalStockVerified: data.physicalStockVerified,
  };
}

export async function listOffers(filters?: {
  productId?: string;
  countryCode?: string;
  cityId?: string;
}): Promise<StoreOffer[]> {
  const constraints: QueryConstraint[] = [];
  if (filters?.productId) constraints.push(where('productId', '==', filters.productId));
  if (filters?.countryCode) constraints.push(where('countryCode', '==', filters.countryCode));
  if (filters?.cityId) constraints.push(where('cityId', '==', filters.cityId));

  const snap = constraints.length
    ? await getDocs(query(offersCol(), ...constraints))
    : await getDocs(offersCol());

  return snap.docs.map((item) => offerFromDoc(item.data() as OfferDoc));
}

export async function upsertOffer(offer: StoreOffer): Promise<void> {
  const payload = offerToDoc(offer);
  await setDoc(doc(db, COLLECTIONS.offers, payload.id), payload, { merge: true });
}

export async function upsertOffers(offers: StoreOffer[]): Promise<number> {
  let written = 0;
  for (const group of chunkArray(offers, 400)) {
    const batch = writeBatch(db);
    group.forEach((offer) => {
      const payload = offerToDoc(offer);
      batch.set(doc(db, COLLECTIONS.offers, payload.id), payload, { merge: true });
    });
    await batch.commit();
    written += group.length;
  }
  return written;
}
