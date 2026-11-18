// Edge/Deno sync hacia Firebase Storage (reemplaza Supabase Storage).
// Secrets: FIREBASE_STORAGE_BUCKET, FIREBASE_WEB_API_KEY, ADMIN_SYNC_TOKEN
// Opcional: usa la app web + reglas de Storage abiertas para upload, o un token OAuth.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js';
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
  const candidates = [...new Set((sources || []).map((s) => s?.trim()).filter(Boolean))];
  for (const c of candidates) {
    if (await headOk(c)) return c;
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
  if (!adminToken) {
    return new Response(JSON.stringify({ error: 'ADMIN_SYNC_TOKEN not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (token !== adminToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const firebaseConfig = {
    apiKey: Deno.env.get('FIREBASE_WEB_API_KEY') || 'AIzaSyAkVGlTq-KLe443x1zprcdyPVfM1k9234Y',
    authDomain: Deno.env.get('FIREBASE_AUTH_DOMAIN') || 'global-wear.firebaseapp.com',
    projectId: Deno.env.get('FIREBASE_PROJECT_ID') || 'global-wear',
    storageBucket: Deno.env.get('FIREBASE_STORAGE_BUCKET') || 'global-wear.firebasestorage.app',
    messagingSenderId: Deno.env.get('FIREBASE_MESSAGING_SENDER_ID') || '211115249334',
    appId: Deno.env.get('FIREBASE_APP_ID') || '1:211115249334:web:4cba2d3541c6db03c6a017',
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const log: {
    startedAt: string;
    finishedAt?: string;
    items: Array<Record<string, unknown>>;
  } = { startedAt: new Date().toISOString(), items: [] };

  for (const p of products) {
    const productOffers = offers.filter((o) => o.productId === p.id);
    if (productOffers.length === 0) {
      log.items.push({ id: p.id, ok: false, reason: 'no-offers' });
      continue;
    }

    const candidateUrl = await resolveValidImageSource(p.images || []);

    for (const off of productOffers) {
      const country = (off.countryCode || 'global').toLowerCase();
      const brand = slugify(p.brand || 'brand');
      const key = `products/${brand}/${country}/${slugify(p.id)}.jpg`;
      const objectRef = ref(storage, key);

      try {
        const existingUrl = await getDownloadURL(objectRef);
        if (await headOk(existingUrl)) {
          log.items.push({ id: p.id, country, ok: true, url: existingUrl, message: 'already-synced' });
          continue;
        }
      } catch {
        // no existe
      }

      if (!candidateUrl) {
        log.items.push({ id: p.id, country, ok: false, reason: 'no-valid-image' });
        continue;
      }

      try {
        const res = await fetch(candidateUrl);
        if (!res.ok) throw new Error('fetch-failed');
        const ab = await res.arrayBuffer();
        await uploadBytes(objectRef, new Uint8Array(ab), {
          contentType: res.headers.get('content-type') || 'image/jpeg',
          cacheControl: 'public, max-age=31536000',
        });
        const finalUrl = await getDownloadURL(objectRef);
        log.items.push({ id: p.id, country, ok: true, url: finalUrl, message: 'uploaded' });
      } catch (e: unknown) {
        log.items.push({
          id: p.id,
          country,
          ok: false,
          reason: 'upload-failed',
          error: e instanceof Error ? e.message : String(e),
        });
      }
    }
  }

  const indexByCountry: Record<string, Record<string, unknown>> = {};
  for (const item of log.items) {
    const country = String(item.country || 'global');
    indexByCountry[country] = indexByCountry[country] || {};
    indexByCountry[country][String(item.id)] = {
      ok: item.ok,
      url: item.url || null,
      message: item.message || item.reason || null,
    };
  }

  for (const country of Object.keys(indexByCountry)) {
    const json = JSON.stringify(indexByCountry[country], null, 2);
    const key = `products/catalogs/${country}/index.json`;
    try {
      await uploadBytes(ref(storage, key), new TextEncoder().encode(json), {
        contentType: 'application/json',
      });
    } catch {
      // ignore
    }
  }

  log.finishedAt = new Date().toISOString();
  const summary = {
    totalProducts: products.length,
    processed: log.items.length,
    successes: log.items.filter((i) => i.ok).length,
    failures: log.items.filter((i) => !i.ok).length,
  };

  return new Response(JSON.stringify({ ok: true, summary, items: log.items }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
