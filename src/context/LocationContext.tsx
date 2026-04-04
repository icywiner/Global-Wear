import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { countries, type Country, type City } from '@/data/locations';

interface LocationState {
  country: Country | null;
  city: City | null;
  setCountry: (c: Country) => void;
  setCity: (c: City) => void;
  resetLocation: () => void;
}

const LocationContext = createContext<LocationState | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<Country | null>(null);
  const [city, setCityState] = useState<City | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('gw-location');
    if (saved) {
      try {
        const { countryCode, cityId } = JSON.parse(saved);
        const c = countries.find(x => x.code === countryCode);
        if (c) {
          setCountryState(c);
          const ci = c.cities.find(x => x.id === cityId);
          if (ci) setCityState(ci);
        }
      } catch {}
    }
  }, []);

  const setCountry = (c: Country) => {
    setCountryState(c);
    setCityState(null);
    localStorage.setItem('gw-location', JSON.stringify({ countryCode: c.code }));
  };

  const setCity = (c: City) => {
    setCityState(c);
    if (country) {
      localStorage.setItem('gw-location', JSON.stringify({ countryCode: country.code, cityId: c.id }));
    }
  };

  const resetLocation = () => {
    setCountryState(null);
    setCityState(null);
    localStorage.removeItem('gw-location');
  };

  return (
    <LocationContext.Provider value={{ country, city, setCountry, setCity, resetLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
}
