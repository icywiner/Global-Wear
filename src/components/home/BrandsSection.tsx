import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';
import { useLocation } from '@/context/LocationContext';
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
        query: encodeURIComponent(brandQueryAlias[name] || name),
        logos: brandLogos[name],
      }));
  }, [country?.code, city?.id]);

  const dynamicLayoutClass = brandsForLocation.length <= 3
    ? 'flex flex-wrap justify-center gap-3 md:gap-4'
    : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4';

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Marcas Globales
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Mostrando solo marcas con productos reales disponibles en {city?.name}, {country?.name}.
            </p>
          </div>
          <Link to="/explorar" className="text-sm text-primary font-medium hover:underline flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {brandsForLocation.length > 0 ? (
          <div className={dynamicLayoutClass}>
            {brandsForLocation.map((brand, i) => (
              <div key={brand.name} className={brandsForLocation.length <= 3 ? 'w-full max-w-[220px]' : ''}>
                <BrandCard brand={brand} index={i} />
              </div>
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
}: {
  brand: {
    name: string;
    query: string;
    logos: string[];
  };
  index: number;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link
        to={`/explorar?q=${brand.query}`}
        className="group block"
      >
        <div className="h-[108px] rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-border p-4 flex flex-col justify-between shadow-sm group-hover:shadow-lg group-hover:border-primary/25 group-hover:-translate-y-0.5 transition-all duration-300">
          <div className="h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center px-3">
            <SmartImage
              sources={brand.logos}
              alt={brand.name}
              onAllFailed={() => setHidden(true)}
              imgClassName="h-7 w-full object-contain"
              skeletonClassName="h-5 w-20 rounded bg-slate-200/70 animate-pulse"
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground group-hover:text-foreground transition-colors">
            {brand.name}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
