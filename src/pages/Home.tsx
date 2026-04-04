import { useState } from 'react';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';
import { categories } from '@/data/products';
import { MapPin, ArrowRight } from 'lucide-react';

export default function Home() {
  const { country, city, setCountry, setCity } = useLocation();

  // If no location selected, show location picker
  if (!country || !city) {
    return <LocationPicker />;
  }

  // Location is set, redirect to browse
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk' }}>
          Compará precios en tiendas oficiales
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Encontrá el mejor precio para tu ropa favorita en{' '}
          <span className="font-semibold text-foreground">{city.name}, {country.name}</span>
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {categories.map(cat => (
          <a
            key={cat.id}
            href={`/explorar?categoria=${cat.id}`}
            className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/40 hover:shadow-md transition-all group"
          >
            <span className="text-4xl block mb-3">{cat.icon}</span>
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {cat.label}
            </span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="/explorar"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Explorar todos los productos
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* Trust bar */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">✅ Precios de tiendas oficiales</span>
        <span className="flex items-center gap-2">🔗 Enlaces directos al producto</span>
        <span className="flex items-center gap-2">🔄 Datos actualizados</span>
      </div>
    </div>
  );
}

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

        {/* Country selection */}
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
          /* City selection */
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
