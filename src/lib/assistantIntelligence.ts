import { catalogProducts, categories, getCatalogBestOffer, getCatalogOffersForProduct, getCatalogProductsForLocation, type Category } from '@/data/catalog';
import { countries } from '@/data/locations';

export type ConversationMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type AssistantIntent =
  | 'GREETING'
  | 'THANKS'
  | 'FAREWELL'
  | 'HOW_IT_WORKS'
  | 'PRODUCT_SEARCH'
  | 'PRICE_QUERY'
  | 'PRICE_COMPARISON'
  | 'BRAND_SEARCH'
  | 'CATEGORY_SEARCH'
  | 'LOCATION_CHANGE'
  | 'GENERAL_INFORMATION';

export type AssistantConversationState = {
  activeProductName: string | null;
  activeBrand: string | null;
  activeCategory: Category | null;
  activeCountryCode: string | null;
  activeCityId: string | null;
};

export type AssistantReplyResult = {
  reply: string;
  intent: AssistantIntent;
  state: AssistantConversationState;
};

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

const BRAND_NAMES = ['Nike', 'Adidas', 'Puma', "Levi's", 'Converse', 'Vans', 'Champion', 'The North Face', 'New Balance'];

const CATEGORY_ALIASES: Array<{ match: string[]; value: Category }> = [
  { match: ['zapatilla', 'zapatillas', 'sneaker', 'sneakers'], value: 'zapatillas' },
  { match: ['remera', 'remeras', 't-shirt', 'camiseta'], value: 'remeras' },
  { match: ['buzo', 'buzos', 'hoodie', 'hoodies'], value: 'buzos' },
  { match: ['campera', 'camperas', 'jacket', 'jackets'], value: 'camperas' },
  { match: ['jean', 'jeans'], value: 'jeans' },
];

const COUNTRY_ALIASES: Record<string, string[]> = {
  US: ['estados unidos', 'eeuu', 'ee.uu.', 'usa', 'united states', 'united states of america', 'us'],
  ES: ['espana', 'españa', 'spain'],
  AR: ['argentina', 'arg', 'ar'],
};

const CITY_ALIASES: Record<string, string[]> = {
  nyc: ['new york', 'nyc', 'nueva york'],
  la: ['los angeles', 'la'],
  mad: ['madrid'],
  bcn: ['barcelona'],
  bue: ['buenos aires', 'buenosaires', 'ba'],
  cor: ['cordoba', 'córdoba'],
};

const STOP_WORDS = new Set([
  'que',
  'cuanto',
  'cuesta',
  'cuestan',
  'sale',
  'salen',
  'el',
  'la',
  'los',
  'las',
  'de',
  'del',
  'por',
  'para',
  'en',
  'y',
  'o',
  'un',
  'una',
  'unos',
  'unas',
  'me',
  'mostrame',
  'mostrar',
  'busco',
  'busca',
  'quiero',
  'tenes',
  'tienen',
  'tiene',
  'hay',
  'mas',
  'más',
  'barato',
  'barata',
  'baratas',
  'baratos',
  'cual',
  'cuál',
  'cuales',
  'cuáles',
  'y',
  'en',
  'argentina',
  'espana',
  'españa',
  'estados',
  'unidos',
]);

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function compact(value: string) {
  return normalize(value).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenize(value: string) {
  return compact(value)
    .split(' ')
    .map((item) => item.trim())
    .filter((item) => item.length > 0 && !STOP_WORDS.has(item));
}

function formatMoney(price: number, currency: string, currencySymbol: string) {
  return `${currencySymbol}${price.toLocaleString()} ${currency}`;
}

function inferBrands(query: string) {
  const normalized = normalize(query);
  const matches: string[] = [];

  BRAND_NAMES.forEach((brand) => {
    if (normalized.includes(normalize(brand))) {
      matches.push(brand);
    }
  });

  Object.entries(BRAND_ALIASES).forEach(([aliasName, brand]) => {
    if (normalized.includes(aliasName) && !matches.includes(brand)) {
      matches.push(brand);
    }
  });

  return matches;
}

function inferBrand(query: string, fallback: string | null) {
  return inferBrands(query)[0] || fallback || null;
}

function inferCategory(query: string, fallback: Category | null) {
  const normalized = normalize(query);
  const alias = CATEGORY_ALIASES.find((item) => item.match.some((word) => normalized.includes(word)));
  return alias?.value || fallback || null;
}

function isGreeting(query: string) {
  return /\b(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches)\b/i.test(query);
}

function isThanks(query: string) {
  return /\b(gracias|muchas gracias|mil gracias|thanks|thank you)\b/i.test(query);
}

function isFarewell(query: string) {
  return /\b(adios|chao|hasta luego|nos vemos|bye)\b/i.test(query);
}

function isHowItWorks(query: string) {
  return /\b(como funciona esta pagina|como funciona globalwear|que es globalwear|como uso esta app|como funciona la app)\b/i.test(
    compact(query)
  );
}

function isLocationQuestion(query: string) {
  return /\b(argentina|espana|españa|estados unidos|eeuu|usa|us|madrid|barcelona|buenos aires|cordoba|córdoba|new york|los angeles)\b/i.test(query);
}

function isContinuationQuery(query: string) {
  return /\b(y|y en|y las|y los|y la|y el|tambien|también|ahi|ahí|cuál|cual|más baratas|mas baratas|más barata|mas barata|cuánto sale|cuanto sale)\b/i.test(query);
}

function chooseReply(candidates: string[], history: ConversationMessage[]) {
  const assistantReplies = new Set(history.filter((message) => message.role === 'assistant').map((message) => message.content));
  return candidates.find((candidate) => !assistantReplies.has(candidate)) || candidates[0];
}

function getRecentUserText(history: ConversationMessage[]) {
  return history
    .filter((message) => message.role === 'user')
    .slice(-3)
    .map((message) => message.content)
    .join(' ');
}

function resolveConversationHints(query: string, context: AssistantContext, history: ConversationMessage[]) {
  const queryBrand = inferBrand(query, null);
  const queryCategory = inferCategory(query, null);
  const historyText = getRecentUserText(history);

  return {
    brand: queryBrand || inferBrand(historyText, context.brand),
    category: queryCategory || inferCategory(historyText, context.category),
  };
}

function resolveCountryCode(query: string) {
  const normalized = normalize(query);

  for (const country of countries) {
    if (normalized.includes(normalize(country.name))) return country.code;

    const aliases = COUNTRY_ALIASES[country.code] || [];
    if (aliases.some((alias) => normalized.includes(alias))) return country.code;
  }

  return null;
}

function resolveCityId(query: string, countryCode?: string | null) {
  const normalized = normalize(query);
  const country = countryCode ? countries.find((item) => item.code === countryCode) : null;

  if (country) {
    const match = country.cities.find((city) => {
      const aliases = CITY_ALIASES[city.id] || [];
      return normalized.includes(normalize(city.name)) || aliases.some((alias) => normalized.includes(alias));
    });

    return match?.id || null;
  }

  for (const item of countries) {
    const match = item.cities.find((city) => {
      const aliases = CITY_ALIASES[city.id] || [];
      return normalized.includes(normalize(city.name)) || aliases.some((alias) => normalized.includes(alias));
    });

    if (match) return match.id;
  }

  return null;
}

function pickLocation(countryCode: string | null, cityId: string | null, fallbackCountryCode: string | null, fallbackCityId: string | null) {
  const country = countries.find((item) => item.code === countryCode) || countries.find((item) => item.code === fallbackCountryCode) || null;
  const finalCountryCode = country?.code || fallbackCountryCode || null;
  const finalCountry = finalCountryCode ? countries.find((item) => item.code === finalCountryCode) || null : null;

  let finalCityId = cityId || fallbackCityId || null;
  if (!finalCityId && finalCountry?.cities[0]) {
    finalCityId = finalCountry.cities[0].id;
  }

  if (finalCountry && finalCityId && !finalCountry.cities.some((city) => city.id === finalCityId)) {
    finalCityId = finalCountry.cities[0]?.id || null;
  }

  return {
    countryCode: finalCountryCode,
    cityId: finalCityId,
    countryName: finalCountryCode ? countries.find((item) => item.code === finalCountryCode)?.name || null : null,
    cityName:
      finalCountryCode && finalCityId
        ? countries.find((item) => item.code === finalCountryCode)?.cities.find((city) => city.id === finalCityId)?.name || null
        : null,
  };
}

function buildLocationProducts(countryCode: string | null, cityId: string | null): AssistantVisibleProduct[] {
  if (!countryCode || !cityId) return [];

  return getCatalogProductsForLocation(countryCode, cityId)
    .map((product) => {
      const offer = getCatalogBestOffer(product.id, countryCode, cityId);
      return offer
        ? {
            id: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: offer.price,
            currency: offer.currency,
            currencySymbol: offer.currencySymbol,
            store: offer.store,
          }
        : null;
    })
    .filter((item): item is AssistantVisibleProduct => Boolean(item))
    .sort((a, b) => a.price - b.price);
}

function productScore(query: string, product: { name: string; brand: string; category: Category }) {
  const normalizedQuery = compact(query);
  const queryTokens = tokenize(query);
  const productName = compact(product.name);
  const productTokens = tokenize(product.name);

  let score = 0;

  if (!normalizedQuery) return score;

  if (normalizedQuery === productName) score += 1000;
  if (normalizedQuery.includes(productName) || productName.includes(normalizedQuery)) score += 650;

  queryTokens.forEach((token) => {
    if (productTokens.includes(token)) {
      score += token.length >= 4 ? 60 : 25;
    }
  });

  if (normalizedQuery.includes(compact(product.brand))) score += 220;
  if (normalizedQuery.includes(compact(product.category))) score += 120;

  if (queryTokens.length === 1 && productTokens.includes(queryTokens[0])) score += 120;

  return score;
}

function searchProducts(query: string, products: AssistantVisibleProduct[]) {
  return [...products]
    .map((product) => ({
      product,
      score: productScore(query, product),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return left.product.price - right.product.price;
    });
}

function findBestProductByName(query: string, products: AssistantVisibleProduct[]) {
  const ranked = searchProducts(query, products);
  const top = ranked[0];

  if (!top || top.score < 80) return null;
  return top.product;
}

function buildProductResponse(product: AssistantVisibleProduct, countryName: string | null, cityName: string | null) {
  const location = [cityName, countryName].filter(Boolean).join(', ');
  return location ? `${product.name} cuesta ${formatMoney(product.price, product.currency, product.currencySymbol)} en ${product.store} de ${location}.` : `${product.name} cuesta ${formatMoney(product.price, product.currency, product.currencySymbol)} en ${product.store}.`;
}

function buildComparisonResponse(product: AssistantVisibleProduct, countryCode: string | null, cityId: string | null) {
  const offers = getCatalogOffersForProduct(product.id, countryCode || undefined, cityId || undefined);

  if (offers.length === 0) {
    return countryCode && cityId
      ? `No encontré ${product.name} disponible en ${countries.find((item) => item.code === countryCode)?.name || countryCode}.`
      : `No encontré ofertas válidas para ${product.name}.`;
  }

  const best = offers[0];
  const location = [best.cityName, best.countryName].filter(Boolean).join(', ');
  return `${product.name} tiene su mejor precio en ${location}: ${formatMoney(best.price, best.currency, best.currencySymbol)} en ${best.store}.`;
}

function buildProductListResponse(products: AssistantVisibleProduct[], countryName: string | null, cityName: string | null, title?: string) {
  const topItems = products.slice(0, 3);

  if (topItems.length === 0) {
    return 'No encontré productos disponibles para esa búsqueda en este momento.';
  }

  const location = [cityName, countryName].filter(Boolean).join(', ');
  const items = topItems.map((product) => `${product.name} por ${formatMoney(product.price, product.currency, product.currencySymbol)} en ${product.store}`).join(' · ');

  return title
    ? `${title} ${location ? `en ${location}` : ''}: ${items}.`
    : `${location ? `Encontré opciones en ${location}` : 'Encontré estas opciones'}: ${items}.`;
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

function getProductCandidates(query: string, context: AssistantContext, brand?: string | null, category?: Category | null) {
  const inferredBrand = brand ?? inferBrand(query, context.brand);
  const inferredCategory = category ?? inferCategory(query, context.category);

  return context.visibleProducts.filter((product) => {
    if (inferredBrand && product.brand !== inferredBrand) return false;
    if (inferredCategory && product.category !== inferredCategory) return false;
    return true;
  });
}

function pickExactProduct(query: string, products: AssistantVisibleProduct[]) {
  const normalized = compact(query);

  return (
    products.find((product) => {
      const productName = compact(product.name);
      const productTokens = productName.split(' ').filter((token) => token.length > 2);

      return normalized.includes(productName) || productTokens.every((token) => normalized.includes(token));
    }) || null
  );
}

function pickAmbiguousProducts(query: string, products: AssistantVisibleProduct[]) {
  const normalized = compact(query);
  if (normalized.length < 3) return [];

  return products.filter((product) => compact(product.name).includes(normalized));
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

function buildBrandComparisonReply(products: AssistantVisibleProduct[], context: AssistantContext, query: string) {
  const requestedBrands = inferBrands(query);
  const brands = requestedBrands.length >= 2 ? requestedBrands : [...new Set(products.map((product) => product.brand))].slice(0, 2);

  if (brands.length < 2) {
    return buildCollectionReply(products, context, query);
  }

  const segments = brands.map((brand) => {
    const brandProducts = products.filter((product) => product.brand === brand);
    if (brandProducts.length === 0) return `${brand}: no encontré productos disponibles en ${locationLabel(context)}`;

    const cheapest = [...brandProducts].sort((a, b) => a.price - b.price)[0];
    return `${brand}: ${brandProducts.length} productos, desde ${formatMoney(cheapest.price, cheapest.currency, cheapest.currencySymbol)} en ${cheapest.store}`;
  });

  return `Comparé ${brands.join(' vs ')} en ${locationLabel(context)}. ${segments.join(' · ')}.`;
}

function buildCollectionReply(products: AssistantVisibleProduct[], context: AssistantContext, query: string) {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  if (isStoreQuestion(query)) {
    const sampleNames = products.slice(0, 3).map((product) => product.name).join(', ');
    return sampleNames
      ? `Encontré ${products.length} productos disponibles en ${locationLabel(context)}: ${sampleNames}.`
      : `Encontré ${products.length} productos disponibles en ${locationLabel(context)}.`;
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

  const sampleNames = products.slice(0, 3).map((product) => product.name).join(', ');

  return sampleNames
    ? `Encontré ${products.length} productos en ${locationLabel(context)}: ${sampleNames}. La opción más barata es ${cheapest.name} por ${formatMoney(cheapest.price, cheapest.currency, cheapest.currencySymbol)}.`
    : `Encontré ${products.length} productos en ${locationLabel(context)}. La opción más barata es ${cheapest.name} por ${formatMoney(cheapest.price, cheapest.currency, cheapest.currencySymbol)}.`;
}

function buildHowItWorksReply(context: AssistantContext) {
  const location = locationLabel(context);

  return location
    ? `GlobalWear te muestra productos reales disponibles en ${location}, te deja filtrar por marca, categoría y tienda, y compara precios oficiales para que veas la mejor opción sin inventar datos.`
    : 'GlobalWear te muestra productos reales por ubicación, te deja filtrar por marca y categoría, y compara precios oficiales para que veas la mejor opción sin inventar datos.';
}

export function buildAssistantReply(
  query: string,
  context: AssistantContext,
  history: ConversationMessage[] = [],
  state: AssistantConversationState = {
    activeProductName: null,
    activeBrand: null,
    activeCategory: null,
    activeCountryCode: context.countryCode,
    activeCityId: context.cityId,
  }
): AssistantReplyResult {
  const normalized = compact(query);
  const intent: AssistantIntent = isGreeting(query)
    ? 'GREETING'
    : isThanks(query)
      ? 'THANKS'
      : isFarewell(query)
        ? 'FAREWELL'
        : isHowItWorks(query)
          ? 'HOW_IT_WORKS'
          : isCompareQuestion(query)
            ? 'PRICE_COMPARISON'
            : isPriceQuestion(query)
              ? 'PRICE_QUERY'
              : isLocationQuestion(query)
                ? 'LOCATION_CHANGE'
                : inferBrands(query).length > 0
                  ? 'BRAND_SEARCH'
                  : inferCategory(query, null)
                    ? 'CATEGORY_SEARCH'
                    : 'GENERAL_INFORMATION';

  const fallbackLocation = pickLocation(context.countryCode, context.cityId, state.activeCountryCode, state.activeCityId);
  const requestedCountryCode = resolveCountryCode(query) || fallbackLocation.countryCode;
  const requestedCityId = resolveCityId(query, requestedCountryCode) || fallbackLocation.cityId;
  const resolvedLocation = pickLocation(requestedCountryCode, requestedCityId, fallbackLocation.countryCode, fallbackLocation.cityId);

  const activeLocationProducts = buildLocationProducts(resolvedLocation.countryCode, resolvedLocation.cityId);
  const focusProducts = activeLocationProducts.length > 0 ? activeLocationProducts : context.visibleProducts;

  if (intent === 'GREETING') {
    return {
      intent,
      state: { ...state, activeCountryCode: resolvedLocation.countryCode, activeCityId: resolvedLocation.cityId },
      reply: chooseReply(
        [
          'Hola. ¿En qué te ayudo?',
          '¡Hola! Puedo buscar productos, comparar marcas y revisar precios.',
          'Hola, decime qué querés comparar y lo miro con el contexto disponible.',
        ],
        history
      ),
    };
  }

  if (intent === 'THANKS') {
    return {
      intent,
      state: { ...state, activeCountryCode: resolvedLocation.countryCode, activeCityId: resolvedLocation.cityId },
      reply: chooseReply(['¡De nada!', 'Cuando quieras, sigo ayudándote.', 'Con gusto. Si querés, hago otra búsqueda.'], history),
    };
  }

  if (intent === 'FAREWELL') {
    return {
      intent,
      state: { ...state, activeCountryCode: resolvedLocation.countryCode, activeCityId: resolvedLocation.cityId },
      reply: chooseReply(['¡Hasta luego!', 'Nos vemos. Si necesitás algo más, acá estoy.', 'Chau. Volvé cuando quieras comparar otra cosa.'], history),
    };
  }

  if (intent === 'HOW_IT_WORKS') {
    return {
      intent,
      state: { ...state, activeCountryCode: resolvedLocation.countryCode, activeCityId: resolvedLocation.cityId },
      reply: buildHowItWorksReply({ ...context, countryCode: resolvedLocation.countryCode, cityId: resolvedLocation.cityId, countryName: resolvedLocation.countryName, cityName: resolvedLocation.cityName }),
    };
  }

  const explicitProduct =
    findBestProductByName(query, focusProducts) ||
    (isContinuationQuery(query) && state.activeProductName ? catalogProducts.find((product) => product.name === state.activeProductName) || null : null);
  const queryBrands = inferBrands(query);
  const queryCategory = inferCategory(query, null);

  if (explicitProduct) {
    const nextState: AssistantConversationState = {
      activeProductName: explicitProduct.name,
      activeBrand: explicitProduct.brand,
      activeCategory: explicitProduct.category,
      activeCountryCode: resolvedLocation.countryCode,
      activeCityId: resolvedLocation.cityId,
    };

    if (intent === 'PRICE_COMPARISON' && (normalized.includes('donde') || normalized.includes('barat'))) {
      const bestOffer = getCatalogOffersForProduct(explicitProduct.id).sort((a, b) => toUSD(a.price, a.currency) - toUSD(b.price, b.currency))[0];
      if (bestOffer) {
        return {
          intent,
          state: nextState,
          reply: `${explicitProduct.name} está más barata en ${bestOffer.cityName}, ${bestOffer.countryName}: ${formatMoney(bestOffer.price, bestOffer.currency, bestOffer.currencySymbol)} en ${bestOffer.store}.`,
        };
      }
    }

    const offer = getCatalogBestOffer(explicitProduct.id, resolvedLocation.countryCode || undefined, resolvedLocation.cityId || undefined);
    if (!offer) {
      return {
        intent,
        state: nextState,
        reply: `No encontré ${explicitProduct.name} disponible en ${resolvedLocation.countryName || 'ese país'}${resolvedLocation.cityName ? `, ${resolvedLocation.cityName}` : ''} dentro del catálogo actual.`,
      };
    }

    return {
      intent: intent === 'PRICE_COMPARISON' ? 'PRICE_COMPARISON' : 'PRODUCT_SEARCH',
      state: nextState,
      reply: buildProductResponse(
        { ...explicitProduct, price: offer.price, currency: offer.currency, currencySymbol: offer.currencySymbol, store: offer.store },
        resolvedLocation.countryName,
        resolvedLocation.cityName
      ),
    };
  }

  const reuseConversationContext = isContinuationQuery(query) || isLocationQuestion(query) || normalized.length <= 4;
  const brand = queryBrands[0] || (reuseConversationContext ? state.activeBrand : null);
  const category = queryCategory || (reuseConversationContext ? state.activeCategory : null);

  const ranked = searchProducts(query, focusProducts.filter((product) => {
    if (brand && product.brand !== brand) return false;
    if (category && product.category !== category) return false;
    return true;
  }));

  const rankedProducts = ranked.filter((entry) => entry.score > 0).map((entry) => entry.product);

  if (rankedProducts.length === 0) {
    if (queryBrands.length > 0 || queryCategory) {
      return {
        intent: queryBrands.length > 0 ? 'BRAND_SEARCH' : 'CATEGORY_SEARCH',
        state: { ...state, activeBrand: brand, activeCategory: category, activeCountryCode: resolvedLocation.countryCode, activeCityId: resolvedLocation.cityId },
        reply: `No encontré productos que coincidan con esa búsqueda en ${resolvedLocation.cityName || resolvedLocation.countryName || 'la ubicación actual'}.`,
      };
    }

    return {
      intent: 'GENERAL_INFORMATION',
      state: { ...state, activeCountryCode: resolvedLocation.countryCode, activeCityId: resolvedLocation.cityId },
      reply: 'No encontré productos disponibles para esa búsqueda en este momento.',
    };
  }

  const top = rankedProducts.slice(0, 3);
  const nextState: AssistantConversationState = {
    activeProductName: top[0]?.name || state.activeProductName,
    activeBrand: brand || top[0]?.brand || state.activeBrand,
    activeCategory: category || top[0]?.category || state.activeCategory,
    activeCountryCode: resolvedLocation.countryCode,
    activeCityId: resolvedLocation.cityId,
  };

  if (intent === 'PRICE_COMPARISON') {
    const cheapest = [...top].sort((a, b) => a.price - b.price)[0];
    return {
      intent,
      state: nextState,
      reply: `${cheapest.name} es la opción más económica en ${resolvedLocation.cityName || resolvedLocation.countryName || 'esa ubicación'}: ${formatMoney(cheapest.price, cheapest.currency, cheapest.currencySymbol)} en ${cheapest.store}.`,
    };
  }

  if (intent === 'BRAND_SEARCH' || intent === 'CATEGORY_SEARCH' || intent === 'PRODUCT_SEARCH') {
    const title = intent === 'BRAND_SEARCH' && brand ? `Encontré productos de ${brand}` : intent === 'CATEGORY_SEARCH' && category ? `Encontré productos de ${categories.find((item) => item.id === category)?.label || category}` : 'Encontré estas opciones';

    return {
      intent,
      state: nextState,
      reply: buildProductListResponse(top, resolvedLocation.countryName, resolvedLocation.cityName, title),
    };
  }

  if (isLocationQuestion(query) && state.activeProductName) {
    const activeProduct = top.find((product) => product.name === state.activeProductName) || top[0];
    return {
      intent: 'LOCATION_CHANGE',
      state: nextState,
      reply: buildProductResponse(activeProduct, resolvedLocation.countryName, resolvedLocation.cityName),
    };
  }

  return {
    intent: 'GENERAL_INFORMATION',
    state: nextState,
    reply: buildProductListResponse(top, resolvedLocation.countryName, resolvedLocation.cityName),
  };
}
