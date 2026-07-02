import { categories, products, type Category, type Product } from '@/data/products';

function unique(values: string[]) {
  return [...new Set(values.map((item) => item.trim()).filter(Boolean))];
}

function sortProducts(items: Product[]) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

export function getProductImageSources(product: Product): string[] {
  const sameBrand = sortProducts(products.filter((item) => item.brand === product.brand && item.id !== product.id));
  const sameCategory = sortProducts(products.filter((item) => item.category === product.category && item.id !== product.id));
  const categoryImage = categories.find((item) => item.id === product.category)?.image;

  return unique([
    ...(product.images || []),
    ...sameBrand.flatMap((item) => item.images || []),
    ...sameCategory.flatMap((item) => item.images || []),
    categoryImage || '',
  ]);
}

export function getBrandImageSources(brand: string): string[] {
  const brandProducts = sortProducts(products.filter((item) => item.brand === brand));
  const categoryImages = unique(
    brandProducts
      .map((item) => categories.find((category) => category.id === item.category)?.image || '')
      .filter(Boolean)
  );

  return unique([
    ...brandProducts.flatMap((item) => item.images || []),
    ...categoryImages,
  ]);
}

export function getCategoryImageSources(category: Category): string[] {
  const categoryProducts = sortProducts(products.filter((item) => item.category === category));
  const categoryImage = categories.find((item) => item.id === category)?.image;

  return unique([
    categoryImage || '',
    ...categoryProducts.flatMap((item) => item.images || []),
  ]);
}
