import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium">GlobalWear Compare</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>Datos obtenidos de tiendas oficiales</span>
            <span>•</span>
            <span>Precios verificados</span>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          © 2026 GlobalWear Compare. Los precios pueden variar. Verificar siempre en la tienda oficial antes de comprar.
        </p>
      </div>
    </footer>
  );
}
