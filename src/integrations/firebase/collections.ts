/** Nombres de colecciones Firestore usadas por GlobalWear. */
export const COLLECTIONS = {
  profiles: 'profiles',
  products: 'products',
  offers: 'offers',
  catalogSyncErrors: 'catalog_sync_errors',
  countries: 'countries',
  meta: '_meta',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
