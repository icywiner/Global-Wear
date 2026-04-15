import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle2, ArrowLeft, Globe2 } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { countries } from '@/data/locations';
import SmartImage from '@/components/ui/SmartImage';

const countryCover: Record<string, string[]> = {
  AR: [
    'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1552793494-111afe03d0ca?auto=format&fit=crop&w=1400&q=80',
  ],
  US: [
    'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1400&q=80',
  ],
  ES: [
    'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1400&q=80',
  ],
};

export default function LocationPicker() {
  const { setCountry, setCity } = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const activeCountry = countries.find(c => c.code === selectedCountry);

  const canContinue = Boolean(activeCountry && selectedCity);

  const onContinue = () => {
    if (!activeCountry || !selectedCity) return;
    const city = activeCountry.cities.find((c) => c.id === selectedCity);
    if (!city) return;
    setCountry(activeCountry);
    setCity(city);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/70 to-slate-950/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mx-auto text-center text-white mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-xs font-medium mb-5">
            <Globe2 className="w-3.5 h-3.5" />
            Onboarding de ubicacion
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
            Elegi donde queres comparar precios
          </h1>
          <p className="text-sm md:text-base text-white/75 max-w-2xl mx-auto">
            Descubri cuanto cuesta la misma ropa en diferentes ciudades del mundo.
            Elegi pais y ciudad para personalizar tu experiencia.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto rounded-[28px] border border-white/15 bg-white/10 backdrop-blur-md p-4 md:p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${selectedCountry ? 'bg-primary text-white' : 'bg-white/20 text-white'}`}>1</span>
              Pais
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ml-3 ${selectedCity ? 'bg-primary text-white' : 'bg-white/20 text-white'}`}>2</span>
              Ciudad
            </div>

            {selectedCountry && (
              <button
                onClick={() => {
                  setSelectedCountry(null);
                  setSelectedCity(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver a paises
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!selectedCountry ? (
            <motion.div
              key="countries"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {countries.map((c, i) => (
                <motion.button
                  key={c.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setSelectedCountry(c.code);
                      setSelectedCity(null);
                    }}
                    className="relative h-52 md:h-60 rounded-2xl overflow-hidden border border-white/20 text-left group"
                >
                    <SmartImage
                      sources={countryCover[c.code] || []}
                      alt={c.name}
                      imgClassName="absolute inset-0 w-full h-full object-cover group-hover:scale-105"
                      skeletonClassName="absolute inset-0 bg-slate-500/40 animate-pulse"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-3xl mb-1">{c.flag}</p>
                      <p className="font-semibold text-white text-lg">{c.name}</p>
                      <p className="text-xs text-white/70 mb-3">{c.cities.map(ci => ci.name).join(' · ')}</p>

                      <div className="inline-flex items-center gap-1 text-xs text-white/90 group-hover:text-white transition-colors">
                        Elegir pais
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                  </div>
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
                <div className="mb-4 text-white/85 text-sm">
                  <span className="font-medium">Pais seleccionado:</span> {activeCountry?.flag} {activeCountry?.name}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {activeCountry?.cities.map((ci, i) => {
                    const selected = selectedCity === ci.id;
                    return (
                      <motion.button
                        key={ci.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => setSelectedCity(ci.id)}
                        className={`w-full rounded-2xl border p-5 text-left transition-all ${
                          selected
                            ? 'bg-primary/25 border-primary/70 shadow-lg'
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-white" />
                            </span>
                            <div>
                              <p className="text-white font-semibold">{ci.name}</p>
                              <p className="text-xs text-white/70">{activeCountry.name}</p>
                            </div>
                          </div>

                          {selected && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
                  <p className="text-sm text-white/80">
                    Seleccion actual:{' '}
                    <span className="text-white font-semibold">
                      {activeCountry?.name}{selectedCity ? ` · ${activeCountry?.cities.find(ci => ci.id === selectedCity)?.name}` : ''}
                    </span>
                  </p>
                  <button
                    onClick={onContinue}
                    disabled={!canContinue}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-45 disabled:cursor-not-allowed transition-opacity"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
