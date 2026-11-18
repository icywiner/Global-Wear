/**
 * Crea/actualiza las colecciones de Firestore y siembra el catálogo.
 *
 * Uso:
 *   npm run migrate:firestore
 *   npm run migrate:firestore -- --force
 *
 * Requiere reglas de Firestore que permitan escritura durante la migración
 * (ver firestore.rules) o autenticación admin.
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore';
import { countries } from '../src/data/locations.ts';
import { offers, products } from '../src/data/products.ts';
import { verifiedCordobaOffers, verifiedCordobaProducts } from '../src/data/verifiedCordoba.ts';

const force = process.argv.includes('--force');

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'AIzaSyAkVGlTq-KLe443x1zprcdyPVfM1k9234Y',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'global-wear.firebaseapp.com',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'global-wear',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'global-wear.firebasestorage.app',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '211115249334',
  appId: process.env.VITE_FIREBASE_APP_ID || '1:211115249334:web:4cba2d3541c6db03c6a017',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTIONS = {
  profiles: 'profiles',
  products: 'products',
  offers: 'offers',
  catalogSyncErrors: 'catalog_sync_errors',
  countries: 'countries',
  meta: '_meta',
} as const;

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function buildOfferId(offer: {
  productId: string;
  store: string;
  countryCode: string;
  cityId: string;
}) {
  return [
    slugify(offer.productId),
    slugify(offer.store),
    slugify(offer.countryCode),
    slugify(offer.cityId),
  ].join('__');
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

async function commitInBatches(
  items: Array<{ id: string; data: Record<string, unknown> }>,
  collectionName: string
) {
  let written = 0;
  for (const group of chunkArray(items, 400)) {
    const batch = writeBatch(db);
    group.forEach(({ id, data }) => {
      batch.set(doc(db, collectionName, id), data, { merge: true });
    });
    await batch.commit();
    written += group.length;
  }
  return written;
}

async function seedCollections() {
  const metaRef = doc(db, COLLECTIONS.meta, 'schema');
  const existing = await getDoc(metaRef);
  if (existing.exists() && !force) {
    console.log('Schema ya existe. Usa --force para reseeding.');
    console.log(existing.data());
    return existing.data();
  }

  const allProducts = [...products, ...verifiedCordobaProducts];
  const allOffers = [...offers, ...verifiedCordobaOffers];

  const productRows = allProducts.map((product) => ({
    id: product.id,
    data: {
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      images: product.images,
      officialBrand: product.officialBrand ?? false,
      officialProductUrl: product.officialProductUrl ?? null,
      officialImageUrl: product.officialImageUrl ?? null,
      priceSourceUrl: product.priceSourceUrl ?? null,
      priceCheckedAt: product.priceCheckedAt ?? null,
      country: product.country ?? null,
      city: product.city ?? null,
      updatedAt: new Date().toISOString(),
    },
  }));

  const offerRows = allOffers.map((offer) => {
    const id = buildOfferId(offer);
    return {
      id,
      data: {
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
      },
    };
  });

  const countryRows = countries.map((country) => ({
    id: country.code,
    data: {
      code: country.code,
      name: country.name,
      flag: country.flag,
      currency: country.currency,
      currencySymbol: country.currencySymbol,
      cities: country.cities,
    },
  }));

  console.log(`Escribiendo ${productRows.length} products...`);
  const productsCount = await commitInBatches(productRows, COLLECTIONS.products);

  console.log(`Escribiendo ${offerRows.length} offers...`);
  const offersCount = await commitInBatches(offerRows, COLLECTIONS.offers);

  console.log(`Escribiendo ${countryRows.length} countries...`);
  const countriesCount = await commitInBatches(countryRows, COLLECTIONS.countries);

  // Documento marcador para catalog_sync_errors (crea la colección)
  await setDoc(doc(collection(db, COLLECTIONS.catalogSyncErrors), '_init'), {
    productId: '_init',
    country: null,
    reason: 'bootstrap',
    message: 'Colección inicializada',
    details: null,
    createdAt: new Date().toISOString(),
  });

  const schema = {
    version: 1,
    collections: Object.values(COLLECTIONS),
    products: productsCount,
    offers: offersCount,
    countries: countriesCount,
    seededAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(metaRef, schema, { merge: true });
  return schema;
}

try {
  console.log(`Migrando catálogo a Firestore (${firebaseConfig.projectId})...`);
  const result = await seedCollections();
  console.log('Migración completada:', result);
  process.exit(0);
} catch (error) {
  console.error('La migración falló:', error instanceof Error ? error.message : error);
  console.error(
    'Tip: desplegá firestore.rules permitiendo escritura temporal, o ejecutá desde un entorno con permisos.'
  );
  process.exit(1);
}
