import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';
import { useLocation } from '@/context/LocationContext';
import { useBrand } from '@/context/BrandContext';
import { getCatalogOffersForProduct, getCatalogProductsForLocation } from '@/data/catalog';

const brandLogos: Record<string, string[]> = {
  Nike: [
    'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    'https://cdn.simpleicons.org/nike/111111',
  ],
  Adidas: [
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    'https://cdn.simpleicons.org/adidas/111111',
  ],
  Puma: [
    'https://cdn.simpleicons.org/puma/111111',
    'https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg',
    'https://images.seeklogo.com/logo-png/28/2/puma-logo-png_seeklogo-288813.png',
  ],
  "Levi's": [
    'https://upload.wikimedia.org/wikipedia/commons/7/75/Levi%27s_logo.svg',
    'https://cdn.simpleicons.org/levis/111111',
  ],
  Zara: [
    'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg',
    'https://cdn.simpleicons.org/zara/111111',
  ],
  'H&M': [
    'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg',
    'https://cdn.simpleicons.org/hm/C9002B',
  ],
  Converse: [
    'https://cdn.simpleicons.org/converse/111111',
  ],
  Vans: [
    'https://cdn.simpleicons.org/vans/111111',
  ],
  'New Balance': [
    'https://cdn.simpleicons.org/newbalance/111111',
  ],
  Champion: [
    'https://cdn.simpleicons.org/champion/111111',
  ],
  'The North Face': [
    'https://cdn.simpleicons.org/thenorthface/111111',
  ],
};

const brandQueryAlias: Record<string, string> = {
  "Levi's": 'Levis',
  'The North Face': 'North Face',
  'New Balance': 'New Balance',
};

const featuredOrder = [
  {
    name: 'Nike',
  },
  {
    name: 'Adidas',
  },
  {
    name: 'Puma',
  },
  {
    name: "Levi's",
  },
  {
    name: 'Zara',
  },
  {
    name: 'H&M',
  },
  {
    name: 'Converse',
  },
  {
    name: 'Vans',
  },
  {
    name: 'New Balance',
  },
  {
    name: 'Champion',
  },
  {
    name: 'The North Face',
  },
];

export default function BrandsSection() {
  const { country, city } = useLocation();
  const { selectedBrand, selectBrand } = useBrand();

  const brandsForLocation = useMemo(() => {
    if (!country || !city) return [];

    const products = getCatalogProductsForLocation(country.code, city.id);
    const validBrandNames = new Set<string>();

    products.forEach((product) => {
      const hasImage = Boolean(product.images?.length);
      const offer = getCatalogOffersForProduct(product.id, country.code, city.id)[0];
      const hasValidOffer = Boolean(
        offer
        && offer.price > 0
        && Boolean(offer.store)
        && Boolean(offer.url)
      );

      if (hasImage && hasValidOffer) {
        validBrandNames.add(product.brand);
      }
    });

    const ordered = featuredOrder
      .map((item) => item.name)
      .filter((name) => validBrandNames.has(name));

    const extras = [...validBrandNames].filter((name) => !ordered.includes(name)).sort((a, b) => a.localeCompare(b));
    const finalNames = [...ordered, ...extras];

    return finalNames
      .filter((name) => Array.isArray(brandLogos[name]) && brandLogos[name].length > 0)
      .map((name) => ({
        name,
        logos: brandLogos[name],
      }));
  }, [country?.code, city?.id]);

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Paso 2 de 4</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">Selecciona una marca</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Mostrando marcas disponibles en {city?.name}, {country?.name}.
          </p>
        </div>

        {brandsForLocation.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {brandsForLocation.map((brand, i) => (
              <BrandCard 
                key={brand.name} 
                brand={brand} 
                index={i}
                isSelected={selectedBrand === brand.name}
                onSelect={() => selectBrand(selectedBrand === brand.name ? null : brand.name)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-base font-semibold text-foreground mb-1">No hay marcas disponibles en esta ciudad</p>
            <p className="text-sm text-muted-foreground">Prueba cambiar de ciudad o país para ver otras tiendas y marcas activas.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function BrandCard({
  brand,
  index,
  isSelected,
  onSelect,
}: {
  brand: {
    name: string;
    logos: string[];
  };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onClick={onSelect}
      className={`w-full h-[120px] rounded-2xl border-2 p-4 flex flex-col justify-between transition-all duration-300 ${
        isSelected
          ? 'border-primary bg-primary/10 shadow-lg scale-105'
          : 'border-border bg-card hover:border-primary/50 hover:bg-secondary/30'
      }`}
    >
      <div className="h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center px-3">
        <SmartImage
          sources={brand.logos}
          alt={brand.name}
          onAllFailed={() => setHidden(true)}
          imgClassName="h-7 w-full object-contain"
          skeletonClassName="h-5 w-20 rounded bg-slate-200/70 animate-pulse"
        />
      </div>
      <p className={`text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
        isSelected ? 'text-primary' : 'text-muted-foreground'
      }`}>
        {brand.name}
      </p>
    </motion.button>
  );
}
