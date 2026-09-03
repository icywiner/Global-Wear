import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, TrendingUp, Store } from 'lucide-react';

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Tiendas oficiales',
    text: 'Cada precio proviene de un enlace verificado de la marca.',
  },
  {
    icon: TrendingUp,
    title: 'Comparación global',
    text: 'Mismo producto, distintas ciudades y monedas.',
  },
  {
    icon: Store,
    title: 'Mapa de tiendas',
    text: 'Encontrá dónde comprar dentro de tu ciudad.',
  },
];

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-foreground px-12 py-14">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Globe className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-background" style={{ fontFamily: 'Space Grotesk' }}>
            GlobalWear Compare
          </span>
        </Link>

        <div className="relative max-w-md">
          <h2
            className="text-4xl font-bold leading-tight text-background"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Descubrí precios reales en todo el mundo
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-background/70">
            Compará marcas globales entre ciudades, encontrá la mejor oferta y decidí con datos verificados.
          </p>

          <div className="mt-9 space-y-4">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-background/15 bg-background/5 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-background">{item.title}</p>
                  <p className="text-xs text-background/60">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-background/45">
          Datos obtenidos únicamente de tiendas oficiales.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'Space Grotesk' }}>
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}

          <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>
        </motion.div>
      </main>
    </div>
  );
}
