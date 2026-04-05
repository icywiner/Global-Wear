import { useState, useMemo } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import { categories, getProductsForLocation, type Category } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, X } from 'lucide-react';

export default function Browse() {
  const { country, city } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const selectedCategory = searchParams.get('categoria') as Category | null;
  const selectedBrand = searchParams.get('marca') || null;

  const allProducts = useMemo(
    () => country && city ? getProductsForLocation(country.code, city.id, selectedCategory || undefined) : [],
    [country?.code, city?.id, selectedCategory]
  );

  const brands = useMemo(() => {
    const b = new Set(allProducts.map(p => p.brand));
    return [...b].sort();
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

  const setCategory = (cat: Category | null) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('categoria', cat); else params.delete('categoria');
    params.delete('marca');
    setSearchParams(params);
  };

  const setBrand = (brand: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (brand) params.set('marca', brand); else params.delete('marca');
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: 'Space Grotesk' }}>
          Productos en {city.name}, {country.name} {country.flag}
        </h1>
        <p className="text-sm text-muted-foreground">
          Precios de tiendas oficiales verificadas
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar productos, marcas..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
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
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              selectedCategory === cat.id
                ? 'bg-foreground text-background border-foreground'
                : 'bg-card text-foreground border-border hover:border-primary/40'
            }`}
          >
            {cat.label}
          </button>
        ))}

        {brands.length > 1 && (
          <>
            <div className="w-px h-8 bg-border mx-1 self-center" />
            <div className="flex items-center gap-1">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </div>
            {brands.map(b => (
              <button
                key={b}
                onClick={() => setBrand(selectedBrand === b ? null : b)}
                className={`px-3 py-2 rounded-full text-xs font-medium border transition-colors ${
                  selectedBrand === b
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {b}
              </button>
            ))}
          </>
        )}

        {selectedBrand && (
          <button
            onClick={() => setBrand(null)}
            className="px-2 py-2 text-xs text-muted-foreground hover:text-danger flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Limpiar
          </button>
        )}
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            No hay productos disponibles
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            No se encontraron productos{selectedCategory ? ` en la categoría seleccionada` : ''}{' '}
            en {city.name}. Probá cambiando de ciudad o categoría.
          </p>
        </div>
      )}
    </div>
  );
}
