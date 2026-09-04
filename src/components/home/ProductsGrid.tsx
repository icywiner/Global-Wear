import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { FixedSizeList as List, type ListChildComponentProps } from 'react-window';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import BackButton from '@/components/ui/BackButton';
import {
  categories,
  getCatalogBestOffer,
  getCatalogProductsForLocation,
  getCatalogSuggestions,
  getStorePoints,
  matchesCatalogQuery,
  searchCatalogProducts,
  toUSD,
  type Category,
  type CatalogOffer,
  type CatalogProduct,
} from '@/data/catalog';
import MarketplaceProductRow from '@/components/home/MarketplaceProductRow';

const MarketplaceMap = lazy(() => import('@/components/home/MarketplaceMap'));

interface RenderItem {
  product: CatalogProduct;
  offer: CatalogOffer;
}

interface RowData {
  items: RenderItem[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string, storeKey: string) => void;
  onImageError: (productId: string) => void;
}

function ProductRow({ index, style, data }: ListChildComponentProps<RowData>) {
  const item = data.items[index];

  return (
    <div style={{ ...style, paddingBottom: 16 }}>
      <MarketplaceProductRow
        product={item.product}
        offer={item.offer}
        isActive={data.selectedProductId === item.product.id}
        onSelect={data.onSelectProduct}
        onImageError={data.onImageError}
      />
    </div>
  );
}

export default function ProductsGrid() {
  const { country, city } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(() => {
    const category = searchParams.get('categoria') as Category | null;
    return category && categories.some((item) => item.id === category) ? category : null;
  });
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [query, setQuery] = useState(() => (searchParams.get('q') || '').trim());
  const [selectedStoreKey, setSelectedStoreKey] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'low' | 'high' | 'popular'>('popular');
  const [priceRange, setPriceRange] = useState<'all' | 'under100' | '100-200' | '200+'>('all');
  const [hiddenProductIds, setHiddenProductIds] = useState<Set<string>>(new Set());
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const hasLocation = Boolean(country && city);
  const normalizedQuery = query.trim();

  const availableProducts = useMemo(() => {
    if (hasLocation) return getCatalogProductsForLocation(country!.code, city!.id);
    return normalizedQuery ? searchCatalogProducts(normalizedQuery) : [];
  }, [country?.code, city?.id, hasLocation, normalizedQuery]);

  const suggestionList = useMemo(
    () => (hasLocation ? getCatalogSuggestions(country!.code, city!.id).slice(0, 40) : []),
    [country?.code, city?.id, hasLocation]
  );

  const brands = useMemo(() => {
    const map = new Map<string, number>();
    availableProducts.forEach((product) => {
      map.set(product.brand, (map.get(product.brand) || 0) + 1);
    });
    return [...map.entries()].map(([brand, count]) => ({ brand, count })).sort((a, b) => b.count - a.count);
  }, [availableProducts]);

  const renderedItems = useMemo(() => {
    const items: RenderItem[] = availableProducts
      .filter((product) => {
        if (hiddenProductIds.has(product.id)) return false;
        if (selectedCategory && product.category !== selectedCategory) return false;
        if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
        if (normalizedQuery && !matchesCatalogQuery(product.id, normalizedQuery)) return false;
        return true;
      })
      .map((product) => {
        const offer = getCatalogBestOffer(product.id);
        return { product, offer };
      })
      .filter((item): item is RenderItem => Boolean(item.offer))
      .filter((item) => {
        const usd = toUSD(item.offer.price, item.offer.currency);
        if (priceRange === 'under100' && usd >= 100) return false;
        if (priceRange === '100-200' && (usd < 100 || usd > 200)) return false;
        if (priceRange === '200+' && usd <= 200) return false;
        if (selectedStoreKey && item.offer.storeKey !== selectedStoreKey) return false;
        return true;
      });

    if (sortBy === 'low') {
      items.sort((a, b) => toUSD(a.offer.price, a.offer.currency) - toUSD(b.offer.price, b.offer.currency));
    }
    if (sortBy === 'high') {
      items.sort((a, b) => toUSD(b.offer.price, b.offer.currency) - toUSD(a.offer.price, a.offer.currency));
    }
    if (sortBy === 'popular') {
      items.sort((a, b) => b.product.popularity - a.product.popularity);
    }

    return items;
  }, [
    availableProducts,
    hiddenProductIds,
    normalizedQuery,
    priceRange,
    selectedBrand,
    selectedCategory,
    selectedStoreKey,
    sortBy,
  ]);

  const storePoints = useMemo(() => {
    if (!hasLocation) return [];
    const productIds = renderedItems.map((item) => item.product.id);
    return getStorePoints(country!.code, city!.id, productIds);
  }, [country?.code, city?.id, hasLocation, renderedItems]);

  const storePreviewProducts = useMemo(() => {
    const previews = new Map<string, string[]>();

    renderedItems.forEach((item) => {
      const list = previews.get(item.offer.storeKey) || [];
      if (!list.includes(item.product.name) && list.length < 5) {
        list.push(item.product.name);
      }
      previews.set(item.offer.storeKey, list);
    });

    return previews;
  }, [renderedItems]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (normalizedQuery.length > 0) {
      params.set('q', normalizedQuery);
    } else {
      params.delete('q');
    }

    if (selectedCategory) {
      params.set('categoria', selectedCategory);
    } else {
      params.delete('categoria');
    }

    setSearchParams(params, { replace: true });
  }, [normalizedQuery, selectedCategory]);

  const onImageError = (productId: string) => {
    setHiddenProductIds((current) => {
      const next = new Set(current);
      next.add(productId);
      return next;
    });
  };

  const onSelectProduct = (productId: string, storeKey: string) => {
    setSelectedProductId(productId);
    setSelectedStoreKey(storeKey);
  };

  const categoryLabel = selectedCategory
    ? categories.find((item) => item.id === selectedCategory)?.label
    : null;

  return (
    <section className="px-4 pb-16 pt-8">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-6 rounded-3xl border border-border bg-card p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <BackButton />
                <nav aria-label="Ruta de navegacion" className="text-xs text-muted-foreground">
                  {hasLocation ? (
                    <span>
                      {country!.flag} {country!.name} <span className="mx-1">/</span> {city!.name}
                      {categoryLabel && (
                        <>
                          <span className="mx-1">/</span> {categoryLabel}
                        </>
                      )}
                    </span>
                  ) : (
                    <span>Busqueda global sin ubicacion seleccionada</span>
                  )}
                </nav>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {categoryLabel ? categoryLabel : normalizedQuery ? `Resultados para "${normalizedQuery}"` : 'Todos los productos'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {renderedItems.length} productos verificados
                {hasLocation ? ` en ${city!.name}, ${country!.name}` : ' en todas las ciudades disponibles'}
              </p>
            </div>

            {(categoryLabel || normalizedQuery) && (
              <div className="flex flex-wrap gap-2">
                {categoryLabel && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/45"
                  >
                    {categoryLabel} <X className="h-3 w-3" />
                  </button>
                )}
                {normalizedQuery && (
                  <button
                    onClick={() => setQuery('')}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/45"
                  >
                    "{normalizedQuery}" <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={`grid gap-6 items-start ${hasLocation ? 'xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]' : ''}`}>
          <div className="rounded-3xl border border-border bg-card p-4 md:p-5">
            <div className="mb-4 grid gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  list="catalog-search-suggestions"
                  placeholder="Buscar por producto, marca, categoria o ciudad..."
                  className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary"
                />
                <datalist id="catalog-search-suggestions">
                  {suggestionList.map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                  ))}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <label className="text-xs font-medium text-muted-foreground">
                  <span className="mb-1 inline-flex items-center gap-1"><SlidersHorizontal className="w-3 h-3" /> Marca</span>
                  <select
                    value={selectedBrand}
                    onChange={(event) => {
                      setSelectedBrand(event.target.value);
                      setSelectedStoreKey(null);
                    }}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground"
                  >
                    <option value="all">Todas</option>
                    {brands.map((brand) => (
                      <option key={brand.brand} value={brand.brand}>
                        {brand.brand} ({brand.count})
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-medium text-muted-foreground">
                  <span className="mb-1 block">Categoria</span>
                  <select
                    value={selectedCategory || 'all'}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSelectedCategory(value === 'all' ? null : (value as Category));
                      setSelectedStoreKey(null);
                      setSelectedProductId(null);
                    }}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground"
                  >
                    <option value="all">Todas</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-medium text-muted-foreground">
                  <span className="mb-1 block">Precio</span>
                  <select
                    value={priceRange}
                    onChange={(event) => setPriceRange(event.target.value as 'all' | 'under100' | '100-200' | '200+')}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground"
                  >
                    <option value="all">Todos</option>
                    <option value="under100">Menor a $100</option>
                    <option value="100-200">$100 a $200</option>
                    <option value="200+">Mayor a $200</option>
                  </select>
                </label>

                <label className="text-xs font-medium text-muted-foreground">
                  <span className="mb-1 block">Orden</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as 'low' | 'high' | 'popular')}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground"
                  >
                    <option value="popular">Popularidad</option>
                    <option value="low">Menor precio</option>
                    <option value="high">Mayor precio</option>
                  </select>
                </label>
              </div>

              {selectedStoreKey && (
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">{storePoints.length} tiendas en el mapa</p>
                  <button
                    onClick={() => {
                      setSelectedStoreKey(null);
                      setSelectedProductId(null);
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/45"
                  >
                    <X className="w-3 h-3" /> Limpiar tienda seleccionada
                  </button>
                </div>
              )}
            </div>

            {renderedItems.length > 0 ? (
              <List
                height={700}
                itemCount={renderedItems.length}
                itemSize={336}
                width="100%"
                itemData={{
                  items: renderedItems,
                  selectedProductId,
                  onSelectProduct,
                  onImageError,
                }}
              >
                {ProductRow}
              </List>
            ) : (
              <div className="rounded-2xl border border-border bg-secondary/25 p-10 text-center">
                <p className="text-lg font-semibold text-foreground mb-1">
                  {normalizedQuery ? `Sin resultados para "${normalizedQuery}"` : 'No hay resultados con los filtros actuales'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Proba con otra palabra, marca o categoria, o cambia la ciudad seleccionada.
                </p>
              </div>
            )}
          </div>

          {hasLocation && (
            <div className="sticky top-24">
              <Suspense
                fallback={
                  <div className="h-[560px] w-full rounded-3xl border border-border bg-card p-6 animate-pulse">
                    <div className="h-full rounded-2xl bg-secondary/45" />
                  </div>
                }
              >
                <MarketplaceMap
                  stores={storePoints}
                  storeProducts={storePreviewProducts}
                  selectedStoreKey={selectedStoreKey}
                  onSelectStore={(storeKey) => {
                    setSelectedStoreKey((current) => (current === storeKey ? null : storeKey));
                    if (!storeKey) setSelectedProductId(null);
                  }}
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
