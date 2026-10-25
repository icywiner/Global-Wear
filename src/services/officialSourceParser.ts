import cheerio from 'cheerio';

type OfficialParseResult = {
  name?: string;
  brand?: string;
  price?: number;
  currency?: string;
  category?: string;
  storeName?: string;
  officialUrl?: string;
  imageCandidates?: string[];
};

function parseJsonLd($: cheerio.CheerioAPI): any[] {
  const results: any[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const txt = $(el).contents().text();
      const doc = JSON.parse(txt);
      if (Array.isArray(doc)) results.push(...doc as any[]);
      else results.push(doc);
    } catch {
      // ignore
    }
  });
  return results;
}

export async function parseOfficialProduct(url: string): Promise<OfficialParseResult | null> {
  try {
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);

    const meta = (name: string) => $('meta').filter((_, el) => ($(el).attr('property') || $(el).attr('name') || '').toLowerCase() === name.toLowerCase()).attr('content') || undefined;

    const result: OfficialParseResult = { officialUrl: url, imageCandidates: [] };

    // JSON-LD (preferred)
    const jsonLd = parseJsonLd($);
    for (const entry of jsonLd) {
      if (!entry) continue;
      const type = (entry['@type'] || entry['@type']?.[0] || '').toLowerCase();
      if (type.includes && type.includes('product') || type === 'product') {
        if (entry.name) result.name = result.name || String(entry.name).trim();
        if (entry.brand) result.brand = result.brand || (typeof entry.brand === 'string' ? entry.brand : entry.brand?.name);
        if (entry.category) result.category = result.category || entry.category;
        if (entry.image) {
          if (Array.isArray(entry.image)) result.imageCandidates!.push(...entry.image.map(String));
          else result.imageCandidates!.push(String(entry.image));
        }
        if (entry.offers) {
          const offers = Array.isArray(entry.offers) ? entry.offers[0] : entry.offers;
          if (offers) {
            if (offers.price) result.price = result.price ?? Number(offers.price);
            if (offers.priceCurrency) result.currency = result.currency || String(offers.priceCurrency);
            if (offers.url) result.officialUrl = result.officialUrl || String(offers.url);
          }
        }
      }
    }

    // Open Graph / Twitter
    result.name = result.name || meta('og:title') || meta('twitter:title') || $('h1').first().text().trim() || undefined;
    const ogImage = meta('og:image') || meta('twitter:image');
    if (ogImage) result.imageCandidates!.push(ogImage);

    // heuristics: find images inside product container and collect alt/title metadata
    const imgMeta: Array<{ src: string; alt?: string; title?: string }> = [];
    $('img').each((_, img) => {
      const src = $(img).attr('src') || $(img).attr('data-src');
      if (!src) return;
      const alt = $(img).attr('alt') || undefined;
      const title = $(img).attr('title') || undefined;
      imgMeta.push({ src: String(src), alt: alt ? String(alt).trim() : undefined, title: title ? String(title).trim() : undefined });
    });
    if (imgMeta.length) {
      result.imageCandidates!.push(...imgMeta.map((m) => m.src));
      result.imageMeta = imgMeta;
    }

    // price heuristic
    if (!result.price) {
      const priceText = $('[class*=price], [id*=price], meta[itemprop="price"]').first().text().trim() || $('meta[name="price"]').attr('content') || undefined;
      if (priceText) {
        const num = Number(priceText.replace(/[^0-9\.,]/g, '').replace(',', '.'));
        if (!Number.isNaN(num)) result.price = num;
      }
    }

    // brand heuristic
    if (!result.brand) {
      const brandMeta = meta('og:site_name') || meta('brand') || $('[class*=brand]').first().text().trim();
      if (brandMeta) result.brand = brandMeta;
    }

    // dedupe image candidates and normalize to absolute URLs
    const base = new URL(url);
    const uniq = Array.from(new Set((result.imageCandidates || []).map((s) => (s || '').trim()).filter(Boolean))).map((s) => {
      try {
        return new URL(s, base).toString();
      } catch {
        return s;
      }
    });
    result.imageCandidates = uniq;

    // normalize imageMeta URLs as well
    if (result.imageMeta && result.imageMeta.length) {
      result.imageMeta = result.imageMeta.map((m) => {
        try {
          return { ...m, src: new URL(m.src, base).toString() };
        } catch {
          return m;
        }
      });
    }

    return result;
  } catch (e) {
    return null;
  }
}

export default parseOfficialProduct;
