import { useState } from 'react';
import { X } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';

interface LocationChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationChangeModal({ isOpen, onClose }: LocationChangeModalProps) {
  const { country, city, setCountry, setCity } = useLocation();
  const [selectedCountry, setSelectedCountry] = useState(country?.code || '');
  const [selectedCity, setSelectedCity] = useState(city?.id || '');

  const currentCountry = countries.find((c) => c.code === selectedCountry);
  const cities = currentCountry?.cities || [];

  const handleChangeLocation = () => {
    const newCountry = countries.find((c) => c.code === selectedCountry);
    const newCity = newCountry?.cities.find((c) => c.id === selectedCity);

    if (newCountry && newCity) {
      setCountry(newCountry);
      setCity(newCity);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Cambiar ubicación</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-secondary/50 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              País
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedCity('');
              }}
              className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary transition-colors"
            >
              <option value="">Selecciona un país</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Ciudad
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedCountry}
              className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/35 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleChangeLocation}
            disabled={!selectedCountry || !selectedCity}
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cambiar
          </button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground text-center">
          Ubicación actual: {country?.flag} {country?.name} · {city?.name}
        </p>
      </div>
    </div>
  );
}
