import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { COLLECTIONS } from '@/integrations/firebase/collections';
import { countries } from '@/data/locations';
import { offers as seedOffers, products as seedProducts } from '@/data/products';
import { verifiedCordobaOffers, verifiedCordobaProducts } from '@/data/verifiedCordoba';
import { upsertCountries } from './countries';
import { upsertOffers } from './offers';
import { upsertProducts } from './products';

const SCHEMA_DOC_ID = 'schema';

export async function ensureFirestoreCollections(options?: {
  forceSeed?: boolean;
}): Promise<{
  seeded: boolean;
  products: number;
  offers: number;
  countries: number;
}> {
  const metaRef = doc(db, COLLECTIONS.meta, SCHEMA_DOC_ID);
  const metaSnap = await getDoc(metaRef);

  if (metaSnap.exists() && !options?.forceSeed) {
    const data = metaSnap.data() as {
      products?: number;
      offers?: number;
      countries?: number;
    };
    return {
      seeded: false,
      products: data.products ?? 0,
      offers: data.offers ?? 0,
      countries: data.countries ?? 0,
    };
  }

  const products = [...seedProducts, ...verifiedCordobaProducts];
  const offers = [...seedOffers, ...verifiedCordobaOffers];

  const productsCount = await upsertProducts(products);
  const offersCount = await upsertOffers(offers);
  const countriesCount = await upsertCountries(countries);

  await setDoc(
    metaRef,
    {
      version: 1,
      collections: Object.values(COLLECTIONS),
      products: productsCount,
      offers: offersCount,
      countries: countriesCount,
      seededAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return {
    seeded: true,
    products: productsCount,
    offers: offersCount,
    countries: countriesCount,
  };
}
