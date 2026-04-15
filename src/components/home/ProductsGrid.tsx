import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { FixedSizeList as List, type ListChildComponentProps } from 'react-window';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import {
  categories,
  getCatalogBestOffer,
  getCatalogProductsForLocation,
  getCatalogStats,
  getCatalogSuggestions,
  getStorePoints,
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedStoreKey, setSelectedStoreKey] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'low' | 'high' | 'popular'>('popular');
  const [priceRange, setPriceRange] = useState<'all' | 'under100' | '100-200' | '200+'>('all');
  const [hiddenProductIds, setHiddenProductIds] = useState<Set<string>>(new Set());
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const stats = useMemo(() => getCatalogStats(), []);

  useEffect(() => {
    const initialQuery = (searchParams.get('q') || '').trim();
    const category = searchParams.get('categoria') as Category | null;

    if (initialQuery) {
      setQuery(initialQuery);
    }

    if (category && categories.some((item) => item.id === category)) {
      setSelectedCategory(category);
    }
  }, []);

  const availableProducts = useMemo(
    () => (country && city ? getCatalogProductsForLocation(country.code, city.id) : []),
    [country?.code, city?.id]
  );

  const suggestionList = useMemo(
    () => (country && city ? getCatalogSuggestions(country.code, city.id).slice(0, 40) : []),
    [country?.code, city?.id]
  );

  const brands = useMemo(() => {
    const map = new Map<string, number>();
    availableProducts.forEach((product) => {
      map.set(product.brand, (map.get(product.brand) || 0) + 1);
    });
    return [...map.entries()].map(([brand, count]) => ({ brand, count })).sort((a, b) => b.count - a.count);
  }, [availableProducts]);

  const renderedItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const items: RenderItem[] = availableProducts
      .filter((product) => {
        if (hiddenProductIds.has(product.id)) return false;
        if (selectedCategory && product.category !== selectedCategory) return false;
        if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
        if (normalizedQuery) {
          const match = `${product.name} ${product.brand}`.toLowerCase().includes(normalizedQuery);
          if (!match) return false;
        }
        return true;
      })
      .map((product) => {
        const offer = getCatalogBestOffer(product.id);
        return { product, offer };
      })
      .filter((item): item is RenderItem => Boolean(item.offer))
      .filter((item) => {
        if (!item.offer) return false;

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
    priceRange,
    query,
    selectedBrand,
    selectedCategory,
    selectedStoreKey,
    sortBy,
  ]);

  const storePoints = useMemo(() => {
    if (!country || !city) return [];
    const productIds = renderedItems.map((item) => item.product.id);
    return getStorePoints(country.code, city.id, productIds);
  }, [country?.code, city?.id, renderedItems]);

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

    if (query.trim().length > 0) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }

    if (selectedCategory) {
      params.set('categoria', selectedCategory);
    } else {
      params.delete('categoria');
    }

    setSearchParams(params, { replace: true });
  }, [query, selectedCategory]);

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

  if (!country || !city) {
    return null;
  }

  return (
    <section className="px-4 pb-16 pt-8">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-6 rounded-3xl border border-border bg-card p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Paso 3 de 4</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Categoria y resultados</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {country.flag} {country.name} · {city.name} · {stats.products} productos validados · {stats.stores} tiendas
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/35 px-4 py-3">
              <p className="text-sm font-semibold text-foreground">Paso 4: comparar y elegir tienda en el mapa</p>
              <p className="text-xs text-muted-foreground">Selecciona una card o pin para sincronizar lista y mapa.</p>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory((current) => (current === category.id ? null : category.id));
                  setSelectedStoreKey(null);
                  setSelectedProductId(null);
                }}
                className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary/40'
                }`}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>

        {!selectedCategory ? (
          <div className="rounded-3xl border border-border bg-card p-12 text-center">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">Flujo obligatorio</p>
            <h3 className="text-2xl font-semibold text-foreground mb-2">Primero elige una categoria</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Para mantener una experiencia tipo Trivago, primero definimos categoria y luego mostramos resultados en vista
              dividida con mapa, filtros, busqueda y ordenamiento.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
            <div className="rounded-3xl border border-border bg-card p-4 md:p-5">
              <div className="mb-4 grid gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    list="catalog-search-suggestions"
                    placeholder="Buscar por producto o marca..."
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
                    <span className="mb-1 block">Ubicacion</span>
                    <input
                      value={`${city.name}, ${country.name}`}
                      readOnly
                      className="h-10 w-full rounded-xl border border-border bg-secondary/40 px-3 text-sm text-foreground"
                    />
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

                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">
                    {renderedItems.length} productos listos para comparar · {storePoints.length} tiendas en mapa
                  </p>
                  {selectedStoreKey && (
                    <button
                      onClick={() => {
                        setSelectedStoreKey(null);
                        setSelectedProductId(null);
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/45"
                    >
                      <X className="w-3 h-3" /> Limpiar tienda seleccionada
                    </button>
                  )}
                </div>
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
                  <p className="text-lg font-semibold text-foreground mb-1">No hay resultados con los filtros actuales</p>
                  <p className="text-sm text-muted-foreground">Prueba otra marca, rango de precio o limpia la tienda seleccionada.</p>
                </div>
              )}
            </div>

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
          </div>
        )}
      </div>
    </section>
  );
}
