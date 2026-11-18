import { addDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { COLLECTIONS } from '@/integrations/firebase/collections';
import type { CatalogSyncErrorDoc } from '@/integrations/firebase/types';

export async function logCatalogSyncError(payload: {
  productId: string;
  country?: string;
  reason?: string;
  message?: string;
  details?: Record<string, unknown> | null;
}): Promise<void> {
  const doc: CatalogSyncErrorDoc = {
    productId: payload.productId,
    country: payload.country ?? null,
    reason: payload.reason ?? null,
    message: payload.message ?? null,
    details: payload.details ?? null,
    createdAt: new Date().toISOString(),
  };

  await addDoc(collection(db, COLLECTIONS.catalogSyncErrors), doc);
}

export async function listRecentCatalogSyncErrors(max = 50): Promise<CatalogSyncErrorDoc[]> {
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.catalogSyncErrors), orderBy('createdAt', 'desc'), limit(max))
  );
  return snap.docs.map((item) => item.data() as CatalogSyncErrorDoc);
}
