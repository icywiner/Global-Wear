import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { hydrateCatalog, getCatalogRevision } from '@/data/catalog';
import { listOffers, listProducts } from '@/services/firestore';

interface CatalogState {
  ready: boolean;
  loading: boolean;
  error: string | null;
  revision: number;
  source: 'firestore' | 'seed';
  refresh: () => Promise<void>;
}

const CatalogContext = createContext<CatalogState | undefined>(undefined);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(getCatalogRevision());
  const [source, setSource] = useState<'firestore' | 'seed'>('seed');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [products, offers] = await Promise.all([listProducts(), listOffers()]);

      if (products.length > 0 && offers.length > 0) {
        const nextRevision = hydrateCatalog(products, offers);
        setRevision(nextRevision);
        setSource('firestore');
      } else {
        setSource('seed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo cargar Firestore';
      setError(message);
      setSource('seed');
    } finally {
      setReady(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ ready, loading, error, revision, source, refresh }),
    [ready, loading, error, revision, source, refresh]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
