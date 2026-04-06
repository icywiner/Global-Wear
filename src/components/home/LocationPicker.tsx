import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';

export default function LocationPicker() {
  const { setCountry, setCity } = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const activeCountry = countries.find(c => c.code === selectedCountry);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            ¿Dónde estás?
          </h1>
          <p className="text-muted-foreground">
            Seleccioná tu ubicación para ver precios y tiendas disponibles
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedCountry ? (
            <motion.div
              key="countries"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-3"
            >
              {countries.map((c, i) => (
                <motion.button
                  key={c.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCountry(c.code)}
                  className="w-full bg-card border border-border rounded-xl px-6 py-4 text-left hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <p className="font-semibold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.cities.map(ci => ci.name).join(', ')}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="cities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
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
                {activeCountry?.cities.map((ci, i) => (
                  <motion.button
                    key={ci.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      if (activeCountry) {
                        setCountry(activeCountry);
                        setCity(ci);
                      }
                    }}
                    className="w-full bg-card border border-border rounded-xl px-6 py-4 text-left hover:border-primary/40 hover:shadow-md transition-all flex items-center justify-between group"
                  >
                    <span className="font-semibold text-foreground">{ci.name}</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
