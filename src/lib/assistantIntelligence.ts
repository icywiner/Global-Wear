import { categories, getCatalogBestOffer, getCatalogOffersForProduct, type Category } from '@/data/catalog';

export type AssistantVisibleProduct = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  currency: string;
  currencySymbol: string;
  store: string;
};

export type AssistantContext = {
  countryName: string | null;
  cityName: string | null;
  countryCode: string | null;
  cityId: string | null;
  currency: string | null;
  currencySymbol: string | null;
  brand: string | null;
  category: Category | null;
  visibleProducts: AssistantVisibleProduct[];
};

const BRAND_ALIASES: Record<string, string> = {
  levis: "Levi's",
  levi: "Levi's",
  'the north face': 'The North Face',
  'new balance': 'New Balance',
};

const CATEGORY_ALIASES: Array<{ match: string[]; value: Category }> = [
  { match: ['zapatilla', 'zapatillas', 'sneaker', 'sneakers'], value: 'zapatillas' },
  { match: ['remera', 'remeras', 't-shirt', 'camiseta'], value: 'remeras' },
  { match: ['buzo', 'buzos', 'hoodie', 'hoodies'], value: 'buzos' },
  { match: ['campera', 'camperas', 'jacket', 'jackets'], value: 'camperas' },
  { match: ['jean', 'jeans'], value: 'jeans' },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function formatMoney(price: number, currency: string, currencySymbol: string) {
  return `${currencySymbol}${price.toLocaleString()} ${currency}`;
}

function inferBrand(query: string, fallback: string | null) {
  const normalized = normalize(query);
  const brands = ['Nike', 'Adidas', 'Puma', "Levi's", 'Converse', 'Vans', 'Champion', 'The North Face', 'New Balance'];
  const found = brands.find((brand) => normalized.includes(normalize(brand)));
  if (found) return found;

  const alias = Object.entries(BRAND_ALIASES).find(([aliasName]) => normalized.includes(aliasName));
  return alias?.[1] || fallback || null;
}

function inferCategory(query: string, fallback: Category | null) {
  const normalized = normalize(query);
  const alias = CATEGORY_ALIASES.find((item) => item.match.some((word) => normalized.includes(word)));
  return alias?.value || fallback || null;
}

function isStoreQuestion(query: string) {
  return /\b(tienda|tiendas|venden|disponible|disponibles|oficial|oficiales)\b/i.test(query);
}

function isCompareQuestion(query: string) {
  return /\b(compara|comparar|mejor precio|más barato|mas barato|más económica|mas economica|menor precio|barata)\b/i.test(query);
}

function isBrandQuestion(query: string) {
  return /\b(marca|marcas|más opciones|mas opciones|hay más|hay mas)\b/i.test(query);
}

function isCategoryQuestion(query: string) {
  return /\b(categoría|categoria|categorías|categorias)\b/i.test(query);
}

function isPriceQuestion(query: string) {
  return /\b(precio|cuesta|cuestan|sale|sale en)\b/i.test(query);
}

function locationLabel(context: AssistantContext) {
  return [context.cityName, context.countryName].filter(Boolean).join(', ');
}

function getProductCandidates(query: string, context: AssistantContext) {
  const inferredBrand = inferBrand(query, context.brand);
  const inferredCategory = inferCategory(query, context.category);

  return context.visibleProducts.filter((product) => {
    if (inferredBrand && product.brand !== inferredBrand) return false;
    if (inferredCategory && product.category !== inferredCategory) return false;
    return true;
  });
}

function pickExactProduct(query: string, products: AssistantVisibleProduct[]) {
  const normalized = normalize(query);
  return products.find((product) => normalize(product.name).includes(normalized) || normalized.includes(normalize(product.name))) || null;
}

function buildProductStores(productId: string, countryCode: string | null, cityId: string | null) {
  if (!countryCode || !cityId) return [];

  return getCatalogOffersForProduct(productId, countryCode, cityId)
    .filter((offer) => offer.price > 0 && Boolean(offer.store) && Boolean(offer.url))
    .map((offer) => `${offer.store} (${offer.currencySymbol}${offer.price.toLocaleString()} ${offer.currency})`);
}

function buildProductReply(product: AssistantVisibleProduct, context: AssistantContext, query: string) {
  const stores = buildProductStores(product.id, context.countryCode, context.cityId);
  const offer = getCatalogBestOffer(product.id, context.countryCode || undefined, context.cityId || undefined);

  if (isStoreQuestion(query)) {
    if (stores.length === 0) return 'No encontré tiendas oficiales para ese producto en la ubicación actual.';
    return `Encontré estas tiendas para ${product.name} en ${locationLabel(context)}: ${stores.join(' · ')}.`;
  }

  if (isCompareQuestion(query) || isPriceQuestion(query)) {
    if (!offer) return 'No encontré un precio válido para ese producto en la ubicación actual.';
    return `${product.name} cuesta ${formatMoney(offer.price, offer.currency, offer.currencySymbol)} en ${offer.store}.`;
  }

  return `${product.name} cuesta ${formatMoney(product.price, product.currency, product.currencySymbol)} en ${product.store}.`;
}

function buildCollectionReply(products: AssistantVisibleProduct[], context: AssistantContext, query: string) {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  if (isStoreQuestion(query)) {
    return `Encontré ${products.length} productos disponibles en ${locationLabel(context)}.`;
  }

  if (isCompareQuestion(query) || isPriceQuestion(query)) {
    if (!cheapest || !mostExpensive) return 'No encontré suficientes precios para comparar.';
    if (products.length === 1) {
      const item = products[0];
      return `${item.name} cuesta ${formatMoney(item.price, item.currency, item.currencySymbol)} en ${item.store}.`;
    }

    return `La opción más barata es ${cheapest.name} por ${formatMoney(cheapest.price, cheapest.currency, cheapest.currencySymbol)} en ${cheapest.store}. La más cara es ${mostExpensive.name} por ${formatMoney(mostExpensive.price, mostExpensive.currency, mostExpensive.currencySymbol)} en ${mostExpensive.store}.`;
  }

  if (products.length === 1) {
    const item = products[0];
    return `${item.name} cuesta ${formatMoney(item.price, item.currency, item.currencySymbol)} en ${item.store}.`;
  }

  return `Encontré ${products.length} productos en ${locationLabel(context)}. La opción más barata es ${cheapest.name} por ${formatMoney(cheapest.price, cheapest.currency, cheapest.currencySymbol)}.`;
}

export function buildAssistantReply(query: string, context: AssistantContext) {
  const normalized = normalize(query);
  const products = getProductCandidates(query, context);

  if (products.length === 0) {
    const missingContext = [!context.countryName && 'país', !context.cityName && 'ciudad', !context.brand && 'marca', !context.category && 'categoría']
      .filter(Boolean)
      .slice(0, 2)
      .join(' y ');

    return missingContext
      ? `No encontré productos disponibles con la selección actual. Necesito ${missingContext} para responder con precisión.`
      : 'No encontré productos disponibles para esa búsqueda en este momento.';
  }

  const exactProduct = pickExactProduct(query, products);
  if (exactProduct) {
    return buildProductReply(exactProduct, context, query);
  }

  const hasSingleBrand = context.brand && products.every((item) => item.brand === context.brand);
  const hasSingleCategory = context.category && products.every((item) => item.category === context.category);

  if (hasSingleBrand || isBrandQuestion(query)) {
    const brandName = context.brand || products[0].brand;
    const brandProducts = products.filter((item) => item.brand === brandName);
    const cheapest = [...brandProducts].sort((a, b) => a.price - b.price)[0];
    return `${brandName} tiene ${brandProducts.length} productos en ${locationLabel(context)}${cheapest ? `; el más barato es ${cheapest.name} por ${formatMoney(cheapest.price, cheapest.currency, cheapest.currencySymbol)}.` : '.'}`;
  }

  if (hasSingleCategory || isCategoryQuestion(query)) {
    const categoryName = categories.find((item) => item.id === context.category)?.label || context.category || products[0].category;
    const categoryProducts = products.filter((item) => item.category === (context.category || products[0].category));
    const cheapest = [...categoryProducts].sort((a, b) => a.price - b.price)[0];
    return `${categoryName} muestra ${categoryProducts.length} productos en ${locationLabel(context)}${cheapest ? `; el más barato es ${cheapest.name} por ${formatMoney(cheapest.price, cheapest.currency, cheapest.currencySymbol)}.` : '.'}`;
  }

  if (isStoreQuestion(query) || isCompareQuestion(query) || isPriceQuestion(query) || normalized.includes('cuál') || normalized.includes('cual')) {
    return buildCollectionReply(products, context, query);
  }

  return buildCollectionReply(products, context, query);
}
