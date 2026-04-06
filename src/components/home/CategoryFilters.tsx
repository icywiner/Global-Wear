import { motion } from 'framer-motion';
import { categories, type Category } from '@/data/products';

interface Props {
  selected: Category | null;
  onSelect: (cat: Category | null) => void;
}

export default function CategoryFilters({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
          selected === null
            ? 'bg-foreground text-background border-foreground'
            : 'bg-card text-foreground border-border hover:border-primary/40'
        }`}
      >
        Todos
      </button>
      {categories.map(cat => (
        <motion.button
          key={cat.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(selected === cat.id ? null : cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            selected === cat.id
              ? 'bg-foreground text-background border-foreground'
              : 'bg-card text-foreground border-border hover:border-primary/40'
          }`}
        >
          {cat.icon} {cat.label}
        </motion.button>
      ))}
    </div>
  );
}
