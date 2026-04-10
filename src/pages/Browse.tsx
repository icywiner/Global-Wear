import { useState, useMemo } from 'react';
import { useSearchParams, Navigate, Link } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import { categories, getProductsForLocation, type Category } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, X, ChevronRight, Home } from 'lucide-react';

const ITEMS_PER_PAGE = 24;

export default function Browse() {
  const { country, city } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const selectedCategory = searchParams.get('categoria') as Category | null;
  const selectedBrand = searchParams.get('marca') || null;

  const allProducts = useMemo(
    () => country && city ? getProductsForLocation(country.code, city.id, selectedCategory || undefined) : [],
    [country?.code, city?.id, selectedCategory]
  );

  const brands = useMemo(() => {
    const b = new Map<string, number>();
    allProducts.forEach(p => b.set(p.brand, (b.get(p.brand) || 0) + 1));
    return [...b.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (selectedBrand) result = result.filter(p => p.brand === selectedBrand);
    const q = searchQuery.toLowerCase();
    if (q) {
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allProducts, selectedBrand, searchQuery]);

  if (!country || !city) return <Navigate to="/" replace />;

  const shownProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const setCategory = (cat: Category | null) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('categoria', cat); else params.delete('categoria');
    params.delete('marca');
    setSearchParams(params);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const setBrand = (brand: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (brand) params.set('marca', brand); else params.delete('marca');
    setSearchParams(params);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" /> Inicio
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="flex items-center gap-1">{country.flag} {country.name}</span>
        <ChevronRight className="w-3 h-3" />
        <span>{city.name}</span>
        {selectedCategory && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">
              {categories.find(c => c.id === selectedCategory)?.label}
            </span>
          </>
        )}
        {selectedBrand && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{selectedBrand}</span>
          </>
        )}
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'Space Grotesk' }}>
          {selectedBrand || (selectedCategory ? categories.find(c => c.id === selectedCategory)?.label : 'Productos')} en {city.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} productos de tiendas oficiales verificadas
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar productos, marcas..."
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
          className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        <button
          onClick={() => setCategory(null)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            !selectedCategory
              ? 'bg-foreground text-background border-foreground'
              : 'bg-card text-foreground border-border hover:border-primary/40'
          }`}
        >
          Todas
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              selectedCategory === cat.id
                ? 'bg-foreground text-background border-foreground'
                : 'bg-card text-foreground border-border hover:border-primary/40'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Brand filters */}
      {brands.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide items-center">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          {brands.map(b => (
            <button
              key={b.name}
              onClick={() => setBrand(selectedBrand === b.name ? null : b.name)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selectedBrand === b.name
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/30'
              }`}
            >
              {b.name} ({b.count})
            </button>
          ))}
          {selectedBrand && (
            <button
              onClick={() => setBrand(null)}
              className="shrink-0 px-2 py-1.5 text-xs text-muted-foreground hover:text-danger flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Limpiar
            </button>
          )}
        </div>
      )}

      {/* Products grid */}
      {shownProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {shownProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="px-8 py-3 bg-card border border-border text-foreground rounded-full text-sm font-medium hover:border-primary/40 hover:shadow-md transition-all"
              >
                Cargar más ({filteredProducts.length - visibleCount} restantes)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-card border border-border rounded-2xl">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            No hay productos disponibles
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            No se encontraron productos{selectedCategory ? ` en ${categories.find(c => c.id === selectedCategory)?.label}` : ''}{' '}
            en {city.name}. Probá cambiando de ciudad o categoría.
          </p>
        </div>
      )}
    </div>
  );
}
