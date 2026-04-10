import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { categories, type Category } from '@/data/products';

const categoryGradients: Record<Category, string> = {
  zapatillas: 'from-orange-500/90 to-red-600/90',
  remeras: 'from-sky-500/90 to-blue-600/90',
  jeans: 'from-indigo-500/90 to-violet-600/90',
  buzos: 'from-emerald-500/90 to-teal-600/90',
  camperas: 'from-slate-600/90 to-slate-800/90',
};

export default function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">
          Categorías
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => navigate(`/explorar?categoria=${cat.id}`)}
              className="relative overflow-hidden rounded-2xl aspect-[4/3] group"
            >
              {/* BG image */}
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${categoryGradients[cat.id]}`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-3xl mb-1">{cat.icon}</span>
                <p className="text-sm md:text-base font-bold text-white">{cat.label}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
