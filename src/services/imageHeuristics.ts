import { type Product } from '@/data/products';

function slugify(value: string | undefined) {
  if (!value) return '';
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

type ImageMeta = { src: string; alt?: string; title?: string };

export async function imageLikelyMatchesProduct(
  product: Product,
  imageUrl: string,
  sourceUrl?: string,
  imageMeta?: ImageMeta[] | null,
  opts?: { minScore?: number }
) {
  const reasons: string[] = [];
  let score = 0;
  const minScore = opts?.minScore ?? 2;

  try {
    const imgUrl = new URL(imageUrl);
    if (sourceUrl) {
      try {
        const srcHost = new URL(sourceUrl).hostname;
        if (srcHost === imgUrl.hostname) {
          score += 2;
          reasons.push('host-match');
        }
      } catch {
        // ignore
      }
    }

    const path = decodeURIComponent(imgUrl.pathname || '').toLowerCase();
    const brandSlug = slugify(product.brand);
    const nameSlug = slugify(product.name);
    const categorySlug = slugify(product.category as any);

    if (brandSlug && path.includes(brandSlug)) {
      score += 2;
      reasons.push('brand-in-path');
    }
    if (nameSlug && path.includes(nameSlug)) {
      score += 2;
      reasons.push('name-in-path');
    }
    if (categorySlug && path.includes(categorySlug)) {
      score += 1;
      reasons.push('category-in-path');
    }

    if (/placeholder|no[-_ ]?image|default|blank|empty/i.test(path)) {
      score -= 4;
      reasons.push('placeholder-filename');
    }

    // use alt/title metadata if available
    if (imageMeta && imageMeta.length) {
      const candidate = imageMeta.find((m) => {
        try {
          return new URL(m.src).toString() === new URL(imageUrl).toString();
        } catch {
          return m.src === imageUrl;
        }
      });
      if (candidate) {
        const text = ((candidate.alt || '') + ' ' + (candidate.title || '')).toLowerCase();
        if (brandSlug && text.includes(brandSlug.replace(/-/g, ' '))) {
          score += 3;
          reasons.push('brand-in-alt');
        }
        if (nameSlug && text.includes(nameSlug.replace(/-/g, ' '))) {
          score += 3;
          reasons.push('name-in-alt');
        }
      }
    }

    // HEAD request to check content-type and length
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 4500);
      const res = await fetch(imageUrl, { method: 'HEAD', signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (!ct.includes('image')) {
          score -= 3;
          reasons.push('not-image-content-type');
        }
        const cl = res.headers.get('content-length');
        const size = cl ? Number(cl) : 0;
        if (size > 5000) {
          score += 1;
          reasons.push('size-ok');
        } else if (size > 0) {
          score -= 1;
          reasons.push('small-size');
        }
      } else {
        score -= 2;
        reasons.push('head-failed');
      }
    } catch {
      // allow, but penalize slightly
      score -= 1;
      reasons.push('head-timeout');
    }
  } catch (e) {
    reasons.push('invalid-url');
    score -= 2;
  }

  const ok = score >= minScore;
  return { ok, score, reasons, minScoreUsed: minScore };
}

export default imageLikelyMatchesProduct;
