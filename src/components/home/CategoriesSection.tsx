import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories, type Category } from '@/data/products';

interface Props {
  onSelect?: (category: Category | null) => void;
  selected?: Category | null;
}

const categoryColors: Record<Category, string> = {
  zapatillas: 'from-orange-400 to-red-500',
  remeras: 'from-blue-400 to-indigo-500',
  jeans: 'from-indigo-500 to-purple-600',
  buzos: 'from-emerald-400 to-teal-600',
  camperas: 'from-gray-500 to-gray-700',
};

export default function CategoriesSection({ onSelect, selected }: Props) {
  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
          Categorías
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const isSelected = selected === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => onSelect?.(isSelected ? null : cat.id)}
                className={`relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 group ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-md hover:scale-[1.02]'
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[cat.id]} opacity-90`} />

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-3xl mb-2 block">{cat.icon}</span>
                  <p className="text-sm font-bold text-white">{cat.label}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
