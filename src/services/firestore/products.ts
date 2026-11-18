import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
  type QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { COLLECTIONS } from '@/integrations/firebase/collections';
import type { ProductDoc } from '@/integrations/firebase/types';
import type { Product } from '@/data/products';
import { chunkArray } from './helpers';

function productsCol() {
  return collection(db, COLLECTIONS.products);
}

export function productToDoc(product: Product): ProductDoc {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.description,
    images: product.images || [],
    officialBrand: product.officialBrand ?? false,
    officialProductUrl: product.officialProductUrl ?? null,
    officialImageUrl: product.officialImageUrl ?? null,
    priceSourceUrl: product.priceSourceUrl ?? null,
    priceCheckedAt: product.priceCheckedAt ?? null,
    country: product.country ?? null,
    city: product.city ?? null,
    updatedAt: new Date().toISOString(),
  };
}

export function productFromDoc(data: ProductDoc): Product {
  return {
    id: data.id,
    name: data.name,
    brand: data.brand,
    category: data.category,
    description: data.description,
    images: data.images || [],
    officialBrand: data.officialBrand,
    officialProductUrl: data.officialProductUrl ?? undefined,
    officialImageUrl: data.officialImageUrl ?? undefined,
    priceSourceUrl: data.priceSourceUrl ?? undefined,
    priceCheckedAt: data.priceCheckedAt ?? undefined,
    country: data.country ?? undefined,
    city: data.city ?? undefined,
  };
}

export async function getProduct(productId: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COLLECTIONS.products, productId));
  if (!snap.exists()) return null;
  return productFromDoc(snap.data() as ProductDoc);
}

export async function listProducts(filters?: {
  brand?: string;
  category?: string;
  country?: string;
}): Promise<Product[]> {
  const constraints: QueryConstraint[] = [];
  if (filters?.brand) constraints.push(where('brand', '==', filters.brand));
  if (filters?.category) constraints.push(where('category', '==', filters.category));
  if (filters?.country) constraints.push(where('country', '==', filters.country));

  const snap = constraints.length
    ? await getDocs(query(productsCol(), ...constraints))
    : await getDocs(productsCol());

  return snap.docs.map((item) => productFromDoc(item.data() as ProductDoc));
}

export async function upsertProduct(product: Product): Promise<void> {
  const payload = productToDoc(product);
  await setDoc(doc(db, COLLECTIONS.products, product.id), payload, { merge: true });
}

export async function upsertProducts(products: Product[]): Promise<number> {
  let written = 0;
  for (const group of chunkArray(products, 400)) {
    const batch = writeBatch(db);
    group.forEach((product) => {
      const payload = productToDoc(product);
      batch.set(doc(db, COLLECTIONS.products, product.id), payload, { merge: true });
    });
    await batch.commit();
    written += group.length;
  }
  return written;
}
