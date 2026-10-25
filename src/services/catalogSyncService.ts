import { supabase } from '@/integrations/supabase/client';
import { createClient as createServerClient } from '@supabase/supabase-js';
import { products, type Product } from '@/data/products';
import { resolveValidImageSource, buildImageCandidates } from '@/lib/imageValidation';
import { imageLikelyMatchesProduct } from '@/services/imageHeuristics';
import { parseOfficialProduct } from '@/services/officialSourceParser';

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// If running server-side with a service role key, create a privileged client
const SERVER_SUPABASE_URL = typeof process !== 'undefined' ? process.env.SUPABASE_URL || process.env.SUPABASE_API_URL : undefined;
const SERVER_SUPABASE_SERVICE_KEY = typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY : undefined;
const serverSupabase = SERVER_SUPABASE_URL && SERVER_SUPABASE_SERVICE_KEY ? createServerClient(SERVER_SUPABASE_URL as string, SERVER_SUPABASE_SERVICE_KEY as string, { auth: { persistSession: false } }) : null;

async function logErrorToDb(payload: { product_id: string; country?: string; reason?: string; message?: string; details?: any }) {
  if (!serverSupabase) return;
  try {
    await serverSupabase.from('catalog_sync_errors').insert([{ product_id: payload.product_id, country: payload.country || null, reason: payload.reason || null, message: payload.message || null, details: payload.details || null }]);
  } catch (e) {
    // ignore logging errors
  }
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
  const brand = slugify(product.brand || 'brand');
  const key = `${brand}/${country}/${slugify(product.id)}.jpg`;

  try {
    const { data } = supabase.storage.from('products').getPublicUrl(key);
    const publicUrl = data?.publicUrl || null;
    if (publicUrl && await existsPublicUrl(publicUrl)) return publicUrl;
  } catch (e) {
    // ignore
  }

  return null;
}

export async function syncProductImageToStorage(product: Product, country = 'global', imageMeta: Array<{ src: string; alt?: string; title?: string }> | null = null, opts?: { minScore?: number }) {
  // Find a valid source from the product's declared images
  const candidate = await resolveValidImageSource(buildImageCandidates(product.images || []));
  if (!candidate) {
    return { ok: false, message: 'No valid source found' };
  }

  // Heuristic validation: ensure image likely belongs to product
  try {
    const heur = await imageLikelyMatchesProduct(product, candidate, product.sourceUrl, imageMeta, opts);
    if (!heur.ok) {
      return { ok: false, message: 'Heuristics failed', details: heur };
    }
  } catch (e: any) {
    // fallback to proceed if heuristics fails unexpectedly
  }

  try {
    const blobRes = await fetch(candidate, { mode: 'cors' });
    if (!blobRes.ok) return { ok: false, message: 'Failed to fetch source' };
    const blob = await blobRes.blob();

    const brand = slugify(product.brand || 'brand');
    const key = `${brand}/${country}/${slugify(product.id)}.jpg`;

    const { error: uploadError } = await supabase.storage.from('products').upload(key, blob, {
      contentType: blob.type || 'image/jpeg',
      cacheControl: 'public, max-age=31536000',
      upsert: false,
    } as any);

    if (uploadError) {
      // If object already exists, return existing public url
      if (uploadError.message && /already exists/i.test(uploadError.message)) {
        const { data } = supabase.storage.from('products').getPublicUrl(key);
        return { ok: true, url: data?.publicUrl || null };
      }

      return { ok: false, message: uploadError.message };
    }

    const { data } = supabase.storage.from('products').getPublicUrl(key);
    return { ok: true, url: data?.publicUrl || null };
  } catch (e: any) {
    return { ok: false, message: e?.message || String(e) };
  }
}

export async function syncCatalog(options?: { country?: string; brands?: string[]; fetchOfficial?: boolean }) {
  const country = options?.country || 'global';
  const allowedBrands = options?.brands ? new Set(options.brands.map((b) => b.toLowerCase())) : null;

  const results: Array<{ id: string; ok: boolean; url?: string; message?: string }> = [];

  for (const p of products) {
    if (allowedBrands && !allowedBrands.has(p.brand.toLowerCase())) continue;
    let productToUse: Product = p;
    // Optionally fetch fresh data from the official product page
    if (options?.fetchOfficial && p.sourceUrl) {
      try {
        const parsed = await parseOfficialProduct(p.sourceUrl);
        if (parsed) {
          // merge parsed fields without losing original data
          productToUse = { ...p } as Product;
          if (parsed.name) productToUse.name = parsed.name;
          if (parsed.brand) productToUse.brand = parsed.brand;
          if (parsed.category) productToUse.category = parsed.category as any;
          if (parsed.price) productToUse.price = parsed.price as any;
          if (parsed.currency) productToUse.currency = parsed.currency as any;
          if (parsed.officialUrl) productToUse.sourceUrl = parsed.officialUrl;
          if (parsed.imageCandidates && parsed.imageCandidates.length) productToUse.images = parsed.imageCandidates as any;
          // attach image meta for heuristics (non-standard prop)
          (productToUse as any)._imageMeta = parsed.imageMeta || null;
        }
      } catch {
        // failed to parse official page, continue with original product
      }
    }

    const synced = await getSyncedImageUrl(productToUse, country);
    if (synced) {
      results.push({ id: p.id, ok: true, url: synced });
      continue;
    }

    // attempt upload
    const res = await syncProductImageToStorage(productToUse, country, (productToUse as any)._imageMeta || null, { minScore: 3 });
    results.push({ id: p.id, ok: !!res.ok, url: res.ok ? res.url : undefined, message: res.ok ? undefined : res.message });
    if (!res.ok) {
      // Log failure to DB for review (best-effort)
      try {
        await logErrorToDb({ product_id: p.id, country, reason: res.message || 'sync-failed', message: res.message || null, details: (res as any).details || null });
      } catch {
        // ignore
      }
    }
  }

  // Save a simple index file with mapping
  const index = results.reduce((acc, r) => {
    acc[r.id] = { ok: r.ok, url: r.url || null, message: r.message || null };
    return acc;
  }, {} as Record<string, any>);

  try {
    const blob = new Blob([JSON.stringify(index, null, 2)], { type: 'application/json' });
    const path = `catalogs/${country}/index.json`;
    await supabase.storage.from('products').upload(path, blob, { contentType: 'application/json', upsert: true } as any);
  } catch (e) {
    // ignore index upload errors for now
  }

  return results;
}

export async function fetchCatalogIndex(country = 'global') {
  try {
    const path = `catalogs/${country}/index.json`;
    const { data } = supabase.storage.from('products').getPublicUrl(path);
    if (!data?.publicUrl) return null;
    const res = await fetch(data.publicUrl);
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
