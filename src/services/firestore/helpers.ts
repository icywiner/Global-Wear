export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** ID determinístico para ofertas: product + store + país + ciudad. */
export function buildOfferId(input: {
  productId: string;
  store: string;
  countryCode: string;
  cityId: string;
}) {
  return [
    slugify(input.productId),
    slugify(input.store),
    slugify(input.countryCode),
    slugify(input.cityId),
  ].join('__');
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}
