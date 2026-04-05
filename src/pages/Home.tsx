import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';
import {
  categories,
  products,
  offers,
  getAllBrands,
  getProductsForLocation,
  getBestOffer,
  type Category,
} from '@/data/products';
import ProductCard from '@/components/ProductCard';
import {
  MapPin,
  ArrowRight,
  Globe,
  ShieldCheck,
  ShoppingBag,
  Tag,
  CheckCircle,
  ExternalLink,
  Search,
} from 'lucide-react';

export default function Home() {
  const { country, city, setCountry, setCity } = useLocation();

  if (!country || !city) {
    return <LocationPicker />;
  }

  return <Dashboard />;
}

/* ─── Dashboard (when location is set) ─── */
function Dashboard() {
  const { country, city } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const availableProducts = useMemo(
    () => country && city ? getProductsForLocation(country.code, city.id, selectedCategory || undefined) : [],
    [country?.code, city?.id, selectedCategory]
  );

  const totalProducts = useMemo(
    () => country && city ? getProductsForLocation(country.code, city.id).length : 0,
    [country?.code, city?.id]
  );

  const brands = useMemo(() => {
    const b = new Set(availableProducts.map(p => p.brand));
    return [...b].sort();
  }, [availableProducts]);

  const allBrands = useMemo(() => {
    if (!country || !city) return [];
    const prods = getProductsForLocation(country.code, city.id);
    return [...new Set(prods.map(p => p.brand))].sort();
  }, [country?.code, city?.id]);

  const popularSearches = ['Nike Air Force 1', 'Adidas Samba', "Levi's 501", 'Converse Chuck Taylor'];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero */}
      <section className="py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <ShieldCheck className="w-4 h-4" />
          Precios reales de tiendas oficiales · {country?.name}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3" style={{ fontFamily: 'Space Grotesk' }}>
          Compará precios de ropa
        </h1>
        <p className="text-2xl md:text-3xl font-bold text-accent italic mb-4" style={{ fontFamily: 'Space Grotesk' }}>
          en tiendas oficiales
        </p>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Datos verificados de tiendas reales. Compará entre {countries.length} países,{' '}
          {totalProducts} productos y {allBrands.length} marcas con enlaces directos.
        </p>

        {/* Search bar */}
        <div className="max-w-lg mx-auto mb-4">
          <Link
            to="/explorar"
            className="flex items-center gap-3 bg-card border border-border rounded-full px-5 py-3 text-sm text-muted-foreground hover:border-primary/40 transition-colors"
          >
            <Search className="w-5 h-5" />
            Buscar Nike Air Force 1, Adidas Samba, Levi's 501...
          </Link>
        </div>

        {/* Popular searches */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {popularSearches.map(s => (
            <Link
              key={s}
              to={`/explorar?q=${encodeURIComponent(s)}`}
              className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-secondary/80 transition-colors"
            >
              {s}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
          <StatCard icon={<Globe className="w-5 h-5 text-primary" />} value={countries.length.toString()} label="Con tiendas verificadas" />
          <StatCard icon={<ShoppingBag className="w-5 h-5 text-accent" />} value={totalProducts.toString()} label="Productos reales" />
          <StatCard icon={<Tag className="w-5 h-5 text-warning" />} value={allBrands.length.toString()} label="Marcas oficiales" />
          <StatCard icon={<CheckCircle className="w-5 h-5 text-success" />} value="100%" label="Datos oficiales" />
        </div>

        {/* Trust icons */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-accent" /> Tiendas verificadas</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-success" /> Precios oficiales</span>
          <span className="flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5 text-primary" /> Enlaces directos</span>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk' }}>
          Categorías
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card text-foreground border-border hover:border-primary/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: 'Space Grotesk' }}>
            Marcas Oficiales
          </h2>
          <Link to="/explorar" className="text-sm text-accent font-medium hover:underline flex items-center gap-1">
            Ver todas <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {allBrands.slice(0, 6).map(brand => {
            const brandProducts = getProductsForLocation(country!.code, city!.id).filter(p => p.brand === brand);
            return (
              <Link
                key={brand}
                to={`/explorar?marca=${encodeURIComponent(brand)}`}
                className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl px-6 py-4 hover:border-primary/40 hover:shadow-sm transition-all min-w-[100px]"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                  {brand.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground">{brand}</span>
                <span className="text-xs text-muted-foreground">{brandProducts.length} productos</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Products grid */}
      <section className="pb-16">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: 'Space Grotesk' }}>
            Productos Disponibles en {country?.flag} {country?.name}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Todos los precios provienen de tiendas oficiales verificadas con enlaces directos al producto.
        </p>

        {availableProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-semibold text-foreground mb-1">No hay productos disponibles</h3>
            <p className="text-sm text-muted-foreground">
              {selectedCategory
                ? 'No se encontraron productos en esta categoría. Probá otra.'
                : `No hay productos en ${city?.name}. Probá cambiando de ciudad.`}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Space Grotesk' }}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* ─── Location Picker ─── */
function LocationPicker() {
  const { setCountry, setCity } = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const activeCountry = countries.find(c => c.code === selectedCountry);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: 'Space Grotesk' }}>
            ¿Dónde estás?
          </h1>
          <p className="text-muted-foreground">
            Seleccioná tu ubicación para ver precios y tiendas disponibles
          </p>
        </div>

        {!selectedCountry ? (
          <div className="grid gap-3">
            {countries.map(c => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className="w-full bg-card border border-border rounded-xl px-6 py-4 text-left hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-4"
              >
                <span className="text-3xl">{c.flag}</span>
                <div>
                  <p className="font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.cities.map(ci => ci.name).join(', ')}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-sm text-primary hover:underline mb-4 flex items-center gap-1"
            >
              ← Cambiar país
            </button>
            <p className="text-sm text-muted-foreground mb-3">
              Elegí una ciudad en {activeCountry?.flag} {activeCountry?.name}:
            </p>
            <div className="grid gap-3">
              {activeCountry?.cities.map(ci => (
                <button
                  key={ci.id}
                  onClick={() => {
                    if (activeCountry) {
                      setCountry(activeCountry);
                      setCity(ci);
                    }
                  }}
                  className="w-full bg-card border border-border rounded-xl px-6 py-4 text-left hover:border-primary/40 hover:shadow-md transition-all flex items-center justify-between"
                >
                  <span className="font-semibold text-foreground">{ci.name}</span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
