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
    'https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg',
  ],
  Vans: [
    'https://upload.wikimedia.org/wikipedia/commons/5/5b/Vans-logo.svg',
  ],
  'New Balance': [
    'https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg',
    'https://cdn.simpleicons.org/newbalance/111111',
  ],
  Champion: [
    'https://upload.wikimedia.org/wikipedia/commons/8/8b/Champion_logo.svg',
  ],
  'The North Face': [
    'https://upload.wikimedia.org/wikipedia/commons/e/e5/The_North_Face_logo.svg',
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

    return finalNames.map((name) => ({
      name,
      query: encodeURIComponent(name),
      logos: Array.isArray(brandLogos[name]) ? brandLogos[name] : [],
    }));
  }, [country?.code, city?.id]);

  const dynamicLayoutClass = 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-3';

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
          <Link to="/productos" className="text-sm text-primary font-medium hover:underline flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {brandsForLocation.length > 0 ? (
          <div className={dynamicLayoutClass}>
            {brandsForLocation.map((brand, i) => (
              <div key={brand.name}>
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
  const [logoFailed, setLogoFailed] = useState(false);
  const showWordmark = logoFailed || brand.logos.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link
        to={`/productos?q=${brand.query}`}
        className="group block"
      >
        <div className="h-[96px] rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-border p-4 flex flex-col justify-between shadow-sm group-hover:shadow-lg group-hover:border-primary/25 group-hover:-translate-y-0.5 transition-all duration-300">
          <div className="h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center px-3 overflow-hidden">
            {showWordmark ? (
              <span className="text-sm font-bold tracking-tight text-foreground text-center leading-tight line-clamp-2">
                {brand.name}
              </span>
            ) : (
              <SmartImage
                sources={brand.logos}
                alt={brand.name}
                onAllFailed={() => setLogoFailed(true)}
                imgClassName="h-7 w-full object-contain"
                skeletonClassName="h-5 w-20 rounded bg-slate-200/70 animate-pulse"
              />
            )}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground group-hover:text-foreground transition-colors">
            {brand.name}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
