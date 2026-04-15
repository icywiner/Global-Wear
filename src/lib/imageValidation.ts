const validationCache = new Map<string, Promise<boolean>>();

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function toCdnFallback(url: string): string[] {
  if (!isHttpUrl(url)) return [];

  const normalized = url.replace(/^https?:\/\//i, '');
  const encoded = encodeURIComponent(normalized);

  return [
    `https://images.weserv.nl/?url=${encoded}&w=1200&output=webp`,
    `https://wsrv.nl/?url=${encoded}&w=1200&output=webp`,
  ];
}

export function buildImageCandidates(sources: string[]): string[] {
  const candidates: string[] = [];

  sources
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((source) => {
      candidates.push(source);
      toCdnFallback(source).forEach((fallback) => candidates.push(fallback));
    });

  return [...new Set(candidates)];
}

async function validateByHead(url: string, timeoutMs = 4500): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'cors',
      cache: 'force-cache',
      signal: controller.signal,
    });

    if (!response.ok) return false;

    const contentType = response.headers.get('content-type') || '';
    const contentLength = response.headers.get('content-length');

    if (contentType && !contentType.toLowerCase().includes('image')) return false;
    if (contentLength && Number(contentLength) === 0) return false;

    return true;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function validateByImageDecode(url: string, timeoutMs = 5500): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    let completed = false;

    const finish = (value: boolean) => {
      if (completed) return;
      completed = true;
      resolve(value);
    };

    const timeoutId = setTimeout(() => finish(false), timeoutMs);

    image.onload = () => {
      clearTimeout(timeoutId);
      finish(image.naturalWidth > 0 && image.naturalHeight > 0);
    };

    image.onerror = () => {
      clearTimeout(timeoutId);
      finish(false);
    };

    image.decoding = 'async';
    image.loading = 'eager';
    image.referrerPolicy = 'no-referrer';
    image.src = url;
  });
}

async function validateSingleUrl(url: string): Promise<boolean> {
  if (!isHttpUrl(url)) return false;

  const cached = validationCache.get(url);
  if (cached) return cached;

  const task = (async () => {
    try {
      const headResult = await validateByHead(url);
      if (headResult) return true;
    } catch {
      // Some CDNs block HEAD via CORS; fallback to image decode validation.
    }

    return validateByImageDecode(url);
  })();

  validationCache.set(url, task);
  return task;
}

export async function resolveValidImageSource(sources: string[]): Promise<string | null> {
  const candidates = buildImageCandidates(sources);

  for (const candidate of candidates) {
    // eslint-disable-next-line no-await-in-loop
    const isValid = await validateSingleUrl(candidate);
    if (isValid) {
      return candidate;
    }
  }

  return null;
}
