import { categories, products, type Category, type Product } from '@/data/products';

function unique(values: string[]) {
  return [...new Set(values.map((item) => item.trim()).filter(Boolean))];
}

function sortProducts(items: Product[]) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

export function getProductImageSources(product: Product): string[] {
  return unique([...(product.images || [])]);
}

export function getBrandImageSources(brand: string): string[] {
  const brandProducts = sortProducts(products.filter((item) => item.brand === brand));

  return unique([
    ...brandProducts.flatMap((item) => item.images || []),
  ]);
}

export function getCategoryImageSources(category: Category): string[] {
  const categoryProducts = sortProducts(products.filter((item) => item.category === category));

  return unique([
    ...categoryProducts.flatMap((item) => item.images || []),
  ]);
}
