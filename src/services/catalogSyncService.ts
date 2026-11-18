import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/integrations/firebase/client';
import { products, type Product } from '@/data/products';
import { resolveValidImageSource, buildImageCandidates } from '@/lib/imageValidation';
import { imageLikelyMatchesProduct } from '@/services/imageHeuristics';
import { parseOfficialProduct } from '@/services/officialSourceParser';
import { logCatalogSyncError } from '@/services/firestore/catalogSyncErrors';
import { slugify } from '@/services/firestore/helpers';

function productStoragePath(product: Product, country = 'global') {
  const brand = slugify(product.brand || 'brand');
  return `products/${brand}/${country}/${slugify(product.id)}.jpg`;
}

function publicUrlForPath(path: string) {
  const bucket = storage.app.options.storageBucket;
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
}

async function existsPublicUrl(url: string, timeout = 4000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal, mode: 'cors' });
    clearTimeout(id);
    return res.ok && (res.headers.get('content-type') || '').includes('image');
  } catch {
    return false;
  }
}

export async function getSyncedImageUrl(product: Product, country = 'global') {
  const key = productStoragePath(product, country);

  try {
    const publicUrl = publicUrlForPath(key);
    if (await existsPublicUrl(publicUrl)) return publicUrl;

    // Fallback: pedir URL firmada/pública al SDK si el objeto existe
    const url = await getDownloadURL(ref(storage, key));
    return url;
  } catch {
    return null;
  }
}

export async function syncProductImageToStorage(
  product: Product,
  country = 'global',
  imageMeta: Array<{ src: string; alt?: string; title?: string }> | null = null,
  opts?: { minScore?: number }
) {
  const candidate = await resolveValidImageSource(buildImageCandidates(product.images || []));
  if (!candidate) {
    return { ok: false, message: 'No valid source found' };
  }

  try {
    const sourceUrl = product.officialProductUrl || product.priceSourceUrl;
    const heur = await imageLikelyMatchesProduct(product, candidate, sourceUrl, imageMeta, opts);
    if (!heur.ok) {
      return { ok: false, message: 'Heuristics failed', details: heur };
    }
  } catch {
    // continuar si falla la heurística
  }

  try {
    const blobRes = await fetch(candidate, { mode: 'cors' });
    if (!blobRes.ok) return { ok: false, message: 'Failed to fetch source' };
    const blob = await blobRes.blob();

    const key = productStoragePath(product, country);
    const objectRef = ref(storage, key);

    try {
      const existing = await getDownloadURL(objectRef);
      return { ok: true, url: existing };
    } catch {
      // no existe, subir
    }

    await uploadBytes(objectRef, blob, {
      contentType: blob.type || 'image/jpeg',
      cacheControl: 'public, max-age=31536000',
    });

    const url = await getDownloadURL(objectRef);
    return { ok: true, url };
  } catch (e: unknown) {
    return { ok: false, message: e instanceof Error ? e.message : String(e) };
  }
}

export async function syncCatalog(options?: { country?: string; brands?: string[]; fetchOfficial?: boolean }) {
  const country = options?.country || 'global';
  const allowedBrands = options?.brands ? new Set(options.brands.map((b) => b.toLowerCase())) : null;

  const results: Array<{ id: string; ok: boolean; url?: string; message?: string }> = [];

  for (const p of products) {
    if (allowedBrands && !allowedBrands.has(p.brand.toLowerCase())) continue;
    let productToUse: Product = p;

    const officialUrl = p.officialProductUrl || p.priceSourceUrl;
    if (options?.fetchOfficial && officialUrl) {
      try {
        const parsed = await parseOfficialProduct(officialUrl);
        if (parsed) {
          productToUse = { ...p };
          if (parsed.name) productToUse.name = parsed.name;
          if (parsed.brand) productToUse.brand = parsed.brand;
          if (parsed.category) productToUse.category = parsed.category as Product['category'];
          if (parsed.imageCandidates?.length) productToUse.images = parsed.imageCandidates;
          (productToUse as Product & { _imageMeta?: unknown })._imageMeta = parsed.imageMeta || null;
        }
      } catch {
        // continuar con el producto original
      }
    }

    const synced = await getSyncedImageUrl(productToUse, country);
    if (synced) {
      results.push({ id: p.id, ok: true, url: synced });
      continue;
    }

    const res = await syncProductImageToStorage(
      productToUse,
      country,
      (productToUse as Product & { _imageMeta?: Array<{ src: string; alt?: string; title?: string }> })._imageMeta || null,
      { minScore: 3 }
    );
    results.push({ id: p.id, ok: !!res.ok, url: res.ok ? res.url : undefined, message: res.ok ? undefined : res.message });

    if (!res.ok) {
      try {
        await logCatalogSyncError({
          productId: p.id,
          country,
          reason: res.message || 'sync-failed',
          message: res.message || undefined,
          details: (res as { details?: Record<string, unknown> }).details || null,
        });
      } catch {
        // ignore
      }
    }
  }

  const index = results.reduce((acc, r) => {
    acc[r.id] = { ok: r.ok, url: r.url || null, message: r.message || null };
    return acc;
  }, {} as Record<string, { ok: boolean; url: string | null; message: string | null }>);

  try {
    const blob = new Blob([JSON.stringify(index, null, 2)], { type: 'application/json' });
    const path = `products/catalogs/${country}/index.json`;
    await uploadBytes(ref(storage, path), blob, { contentType: 'application/json' });
  } catch {
    // ignore index upload errors
  }

  return results;
}

export async function fetchCatalogIndex(country = 'global') {
  try {
    const path = `products/catalogs/${country}/index.json`;
    const url = await getDownloadURL(ref(storage, path));
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default {
  getSyncedImageUrl,
  syncProductImageToStorage,
  syncCatalog,
  fetchCatalogIndex,
};
