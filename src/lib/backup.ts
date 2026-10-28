import JSZip from 'jszip';
import { createClient } from '@supabase/supabase-js';
import { products, offers, categories } from '@/data/products';
import { countries } from '@/data/locations';

const q = (v: unknown) =>
  v === null || v === undefined ? 'null' : typeof v === 'number' || typeof v === 'boolean' ? String(v) : `'${String(v).replace(/'/g, "''")}'`;

export function buildSchemaSql(): string {
  const productRows = products
    .map(p => `(${q(p.id)}, ${q(p.name)}, ${q(p.brand)}, ${q(p.category)}, ${q(p.description)}, ${q(JSON.stringify(p.images))}::jsonb)`)
    .join(',\n');
  const offerRows = offers
    .map(o => `(${q(o.productId)}, ${q(o.store)}, ${q(o.storeType)}, ${q(o.countryCode)}, ${q(o.cityId)}, ${q(o.price)}, ${q(o.currency)}, ${q(o.currencySymbol)}, ${q(o.url)}, ${q(o.inStock)}, ${q(o.lastUpdated)})`)
    .join(',\n');

  return `-- GlobalWear: instalación completa en una base de datos nueva
-- Pegá este archivo entero en el editor SQL del proyecto nuevo y ejecutalo una sola vez.

-- 1. Perfiles de usuario
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT '',
  role TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''));
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Roles (administradores)
DO $$ BEGIN CREATE TYPE public.app_role AS ENUM ('admin', 'user'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role) RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- 3. Catálogo (copia de los productos y precios de la app)
CREATE TABLE IF NOT EXISTS public.catalog_products (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, brand TEXT NOT NULL, category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '', images JSONB NOT NULL DEFAULT '[]'
);
CREATE TABLE IF NOT EXISTS public.catalog_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES public.catalog_products(id) ON DELETE CASCADE,
  store TEXT NOT NULL, store_type TEXT NOT NULL, country_code TEXT NOT NULL, city_id TEXT NOT NULL,
  price NUMERIC NOT NULL, currency TEXT NOT NULL, currency_symbol TEXT NOT NULL, url TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true, last_updated TEXT
);
GRANT SELECT ON public.catalog_products, public.catalog_offers TO anon, authenticated;
GRANT ALL ON public.catalog_products, public.catalog_offers TO service_role;
ALTER TABLE public.catalog_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Catalog is public" ON public.catalog_products FOR SELECT USING (true);
CREATE POLICY "Offers are public" ON public.catalog_offers FOR SELECT USING (true);

INSERT INTO public.catalog_products (id, name, brand, category, description, images) VALUES
${productRows}
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.catalog_offers (product_id, store, store_type, country_code, city_id, price, currency, currency_symbol, url, in_stock, last_updated) VALUES
${offerRows};

-- 4. Para hacerte administrador en la base nueva, después de registrarte ejecutá:
-- INSERT INTO public.user_roles (user_id, role) SELECT id, 'admin' FROM auth.users WHERE email = 'TU_EMAIL';
`;
}

async function fetchImage(url: string, ms = 8000): Promise<Blob | null> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal, mode: 'cors' });
    if (!r.ok) return null;
    const b = await r.blob();
    return b.type.startsWith('image/') ? b : null;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

const extFor = (type: string) => (type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : type.includes('avif') ? 'avif' : 'jpg');

export interface BackupTarget { url: string; anonKey: string }

export async function buildBackupZip(
  target: BackupTarget | null,
  onProgress: (done: number, total: number) => void,
): Promise<{ blob: Blob; saved: number; missing: number }> {
  const zip = new JSZip();
  const date = new Date().toISOString();

  zip.file('database/install.sql', buildSchemaSql());
  zip.file('data/products.json', JSON.stringify(products, null, 2));
  zip.file('data/offers.json', JSON.stringify(offers, null, 2));
  zip.file('data/categories.json', JSON.stringify(categories, null, 2));
  zip.file('data/countries.json', JSON.stringify(countries, null, 2));
  zip.file('app/info.json', JSON.stringify({
    app: 'GlobalWear', created: date, products: products.length, offers: offers.length,
    pages: ['/', '/productos', '/producto/:id', '/login', '/registro', '/admin/backup'],
    flow: 'País → Ciudad → Marca → Categoría → Productos',
  }, null, 2));
  zip.file('app/.env.example', [
    `VITE_SUPABASE_URL="${target?.url ?? 'https://TU-PROYECTO.supabase.co'}"`,
    `VITE_SUPABASE_PUBLISHABLE_KEY="${target?.anonKey ?? 'TU_CLAVE_PUBLICA'}"`,
    `VITE_SUPABASE_PROJECT_ID="${target ? new URL(target.url).hostname.split('.')[0] : 'TU_PROYECTO'}"`,
  ].join('\n') + '\n');

  // Imágenes
  const allImages = new Map<string, string>(); // url -> product id
  products.forEach(p => p.images.forEach(u => !allImages.has(u) && allImages.set(u, p.id)));
  categories.forEach(c => c.image && !allImages.has(c.image) && allImages.set(c.image, `categoria-${c.id}`));
  const entries = [...allImages.entries()];
  const index: Record<string, { url: string; file: string | null }[]> = {};
  const missingList: string[] = [];
  let done = 0; let saved = 0;
  const counters: Record<string, number> = {};
  const queue = [...entries];
  const worker = async () => {
    while (queue.length) {
      const [url, owner] = queue.shift()!;
      const blob = await fetchImage(url);
      let file: string | null = null;
      if (blob) {
        counters[owner] = (counters[owner] ?? 0) + 1;
        file = `images/${owner}-${counters[owner]}.${extFor(blob.type)}`;
        zip.file(file, blob);
        saved++;
      } else missingList.push(url);
      (index[owner] ??= []).push({ url, file });
      onProgress(++done, entries.length);
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  zip.file('images/index.json', JSON.stringify(index, null, 2));
  if (missingList.length) zip.file('images/no-descargadas.txt', missingList.join('\n'));

  zip.file('LEEME.txt', `BACKUP DE GLOBALWEAR — ${date}

Contenido:
- database/install.sql  → estructura completa (usuarios, roles, catálogo) + todos los productos y precios.
- data/*.json           → catálogo, precios, categorías, países y ciudades.
- images/               → fotos de los productos (${saved} guardadas). Las que la tienda no dejó bajar están listadas en no-descargadas.txt con su enlace original.
- app/.env.example      → datos de conexión para apuntar la app a la base nueva.

Cómo reconectar en otra base de datos:
1. Abrí el proyecto nuevo y entrá al editor SQL.
2. Pegá todo database/install.sql y ejecutalo una vez.
3. Copiá los valores de app/.env.example en la configuración de la app.
4. Registrate en la app y hacete administrador con la última línea de install.sql.

Nota: las cuentas de usuarios y contraseñas no se pueden copiar desde la app por seguridad;
para eso usá la exportación completa de la base de datos del panel.
`);

  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  return { blob, saved, missing: missingList.length };
}

export async function testConnection(url: string, anonKey: string): Promise<{ ok: boolean; installed: boolean; message: string }> {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith('.supabase.co')) return { ok: false, installed: false, message: 'La dirección debe terminar en .supabase.co' };
    const client = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await client.from('catalog_products').select('id', { head: true, count: 'exact' });
    if (!error) return { ok: true, installed: true, message: 'Conexión correcta. La base nueva ya tiene el catálogo instalado.' };
    if (/Invalid API key|JWT|401/i.test(error.message)) return { ok: false, installed: false, message: 'La clave no es válida para esa dirección.' };
    return { ok: true, installed: false, message: 'Conexión correcta. Falta instalar la estructura: ejecutá database/install.sql del backup.' };
  } catch {
    return { ok: false, installed: false, message: 'No se pudo conectar. Revisá la dirección y la clave.' };
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
