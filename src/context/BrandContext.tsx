import { createContext, useContext, useState, ReactNode } from 'react';
import { logActivity } from '@/lib/activity';

interface BrandContextType {
  selectedBrand: string | null;
  selectBrand: (brand: string | null) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const selectBrand = (brand: string | null) => {
    setSelectedBrand(brand);
    void logActivity('brand_select', { brand: brand || '' });
  };

  return (
    <BrandContext.Provider value={{ selectedBrand, selectBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}
