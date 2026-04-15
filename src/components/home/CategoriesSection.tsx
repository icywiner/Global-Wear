import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Category } from '@/data/products';
import SmartImage from '@/components/ui/SmartImage';

const categoryCards: Array<{
  id: Category;
  title: string;
  subtitle: string;
  gradient: string;
  textureClass?: string;
  images: string[];
}> = [
  {
    id: 'zapatillas',
    title: 'Zapatillas',
    subtitle: 'Running, lifestyle y retro',
    gradient: 'from-orange-500/95 via-red-500/85 to-rose-700/90',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7bee4ee3e78a4e4a8608a8bf0117cf62_9366/Samba_OG_Shoes_White_B75806_01_standard.jpg',
    ],
  },
  {
    id: 'remeras',
    title: 'Remeras',
    subtitle: 'Basicos premium y performance',
    gradient: 'from-cyan-400/90 via-sky-500/85 to-blue-700/90',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b4a04e63c79149228e32ae0a01517813_9366/Trefoil_Tee_Black_IU2421_01_laydown.jpg',
    ],
  },
  {
    id: 'jeans',
    title: 'Jeans',
    subtitle: 'Cortes clasicos y fit moderno',
    gradient: 'from-indigo-600/95 via-blue-800/85 to-slate-900/90',
    textureClass: 'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.16)_1px,transparent_1px)] before:bg-[size:8px_8px] before:opacity-35',
    images: [
      'https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'buzos',
    title: 'Buzos',
    subtitle: 'Confort tecnico y urbano',
    gradient: 'from-emerald-500/95 via-teal-500/85 to-cyan-700/90',
    images: [
      'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/586688/01/sv01/fnd/PNA/fmt/png/Essentials-Big-Logo-Hoodie',
    ],
  },
  {
    id: 'camperas',
    title: 'Camperas',
    subtitle: 'Outerwear para toda estacion',
    gradient: 'from-slate-600/95 via-zinc-700/85 to-black/90',
    images: [
      'https://images.thenorthface.com/is/image/TheNorthFace/NF0A3C8D_JK3_hero?wid=780&hei=906',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

export default function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-9 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Categorias destacadas</h2>
          <p className="text-sm text-muted-foreground mt-1">Explora por estilo con visuales reales, carga validada y transiciones suaves.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categoryCards.map((cat, i) => (
            <CategoryCard key={cat.id} card={cat} index={i} onClick={() => navigate(`/explorar?categoria=${cat.id}`)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  card,
  index,
  onClick,
}: {
  card: (typeof categoryCards)[number];
  index: number;
  onClick: () => void;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-3xl min-h-[230px] group text-left"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
      {card.textureClass && <div className={card.textureClass} />}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

      <div className="absolute -right-5 -bottom-6 w-40 h-40 rounded-full bg-white/12 blur-2xl group-hover:scale-110 transition-transform duration-500" />

      <div className="relative h-full p-5 flex flex-col justify-between">
        <div>
          <span className="inline-flex rounded-full bg-white/20 text-white text-[11px] uppercase tracking-[0.12em] font-semibold px-3 py-1">
            Categoria
          </span>
        </div>

        <div className="relative h-[122px] w-full">
          <SmartImage
            sources={card.images}
            alt={card.title}
            onAllFailed={() => setHidden(true)}
            imgClassName="absolute right-0 bottom-0 h-full w-full object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.32)] group-hover:scale-105"
            skeletonClassName="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">{card.title}</h3>
          <p className="text-sm text-white/85 mt-0.5">{card.subtitle}</p>
        </div>
      </div>
    </motion.button>
  );
}
