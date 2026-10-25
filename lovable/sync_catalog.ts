// Lovable / Edge function (Deno) to run catalog synchronization server-side
// Reads secrets from environment: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_SYNC_TOKEN
// Protects endpoint by requiring Authorization: Bearer <ADMIN_SYNC_TOKEN>

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.101.1/+esm';
import { products, offers } from '../src/data/products.ts';

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function headOk(url: string, timeout = 4500) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) return false;
    const ct = res.headers.get('content-type') || '';
    if (!ct.toLowerCase().includes('image')) return false;
    const cl = res.headers.get('content-length');
    if (cl && Number(cl) === 0) return false;
    return true;
  } catch {
    return false;
  }
}

async function resolveValidImageSource(sources: string[]) {
  const candidates = [...new Set((sources || []).map(s => s?.trim()).filter(Boolean))];
  for (const c of candidates) {
    if (await headOk(c)) return c;
    // fallback: try GET and check content-type
    try {
      const r = await fetch(c, { method: 'GET' });
      if (!r.ok) continue;
      const ct = r.headers.get('content-type') || '';
      if (ct.toLowerCase().includes('image')) return c;
    } catch {
      // ignore
    }
  }
  return null;
}

export default async function (req: Request) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });

  const adminToken = Deno.env.get('ADMIN_SYNC_TOKEN');
  if (!adminToken) return new Response(JSON.stringify({ error: 'ADMIN_SYNC_TOKEN not configured' }), { status: 503, headers: { 'Content-Type': 'application/json' } });

  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (token !== adminToken) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  const log: any = { startedAt: new Date().toISOString(), items: [] };

  for (const p of products) {
    const productOffers = offers.filter(o => o.productId === p.id);
    if (productOffers.length === 0) {
      log.items.push({ id: p.id, ok: false, reason: 'no-offers' });
      continue;
    }

    // pick a canonical image for the product (validate among declared images)
    const candidateUrl = await resolveValidImageSource(p.images || []);

    for (const off of productOffers) {
      const country = (off.countryCode || 'global').toLowerCase();
      const brand = slugify(p.brand || 'brand');
      const key = `${brand}/${country}/${slugify(p.id)}.jpg`;

      try {
        const { data } = supabase.storage.from('products').getPublicUrl(key);
        const existingUrl = data?.publicUrl || null;
        if (existingUrl) {
          // verify reachable
          if (await headOk(existingUrl)) {
            log.items.push({ id: p.id, country, ok: true, url: existingUrl, message: 'already-synced' });
            continue;
          }
        }
      } catch (e) {
        // ignore and try upload
      }

      if (!candidateUrl) {
        log.items.push({ id: p.id, country, ok: false, reason: 'no-valid-image' });
        continue;
      }

      try {
        const res = await fetch(candidateUrl);
        if (!res.ok) throw new Error('fetch-failed');
        const ab = await res.arrayBuffer();
        const uint8 = new Uint8Array(ab);

        const upload = await supabase.storage.from('products').upload(key, uint8, { contentType: res.headers.get('content-type') || 'image/jpeg', cacheControl: 'public, max-age=31536000', upsert: false } as any);
        if (upload.error) {
          // if already exists, get url
          if (/already exists/i.test(String(upload.error.message || ''))) {
            const { data } = supabase.storage.from('products').getPublicUrl(key);
            log.items.push({ id: p.id, country, ok: true, url: data?.publicUrl || null, message: 'exists' });
            continue;
          }
          throw upload.error;
        }

        const { data: pub } = supabase.storage.from('products').getPublicUrl(key);
        const finalUrl = pub?.publicUrl || null;
        log.items.push({ id: p.id, country, ok: true, url: finalUrl, message: 'uploaded' });
      } catch (e: any) {
        log.items.push({ id: p.id, country, ok: false, reason: 'upload-failed', error: String(e?.message || e) });
      }
    }
  }

  // build index by country
  const indexByCountry: Record<string, any> = {};
  for (const item of log.items) {
    const country = item.country || 'global';
    indexByCountry[country] = indexByCountry[country] || {};
    indexByCountry[country][item.id] = { ok: item.ok, url: item.url || null, message: item.message || item.reason || null };
  }

  for (const country of Object.keys(indexByCountry)) {
    const json = JSON.stringify(indexByCountry[country], null, 2);
    const key = `catalogs/${country}/index.json`;
    try {
      await supabase.storage.from('products').upload(key, new TextEncoder().encode(json), { contentType: 'application/json', upsert: true } as any);
    } catch {
      // ignore
    }
  }

  log.finishedAt = new Date().toISOString();
  const summary = { totalProducts: products.length, processed: log.items.length, successes: log.items.filter((i: any) => i.ok).length, failures: log.items.filter((i: any) => !i.ok).length };

  return new Response(JSON.stringify({ ok: true, summary, items: log.items }), { headers: { 'Content-Type': 'application/json' } });
}
