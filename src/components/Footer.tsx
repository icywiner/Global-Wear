import { Link } from 'react-router-dom';
import { Globe, ShieldCheck, ExternalLink, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/90 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-foreground text-lg">GlobalWear</span>
                <p className="text-[10px] text-muted-foreground -mt-0.5">Compare</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Compará precios reales de ropa entre tiendas oficiales de todo el mundo. 
              Datos verificados, enlaces directos, sin intermediarios.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1.5 text-xs text-muted-foreground">
              Startup-ready UI
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* How it works */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Cómo Funcionamos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                Verificamos precios de tiendas oficiales
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                Solo datos reales, nunca estimaciones
              </li>
              <li className="flex items-start gap-2">
                <ExternalLink className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                Enlaces directos a cada producto
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Explorar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/explorar" className="hover:text-primary transition-colors">Todos los Productos</Link></li>
              <li><Link to="/explorar?categoria=zapatillas" className="hover:text-primary transition-colors">Zapatillas</Link></li>
              <li><Link to="/explorar?categoria=buzos" className="hover:text-primary transition-colors">Buzos / Hoodies</Link></li>
              <li><Link to="/explorar?categoria=jeans" className="hover:text-primary transition-colors">Jeans</Link></li>
              <li><Link to="/explorar?categoria=remeras" className="hover:text-primary transition-colors">Remeras</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Cuenta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-primary transition-colors">Iniciar sesion</Link></li>
              <li><Link to="/registro" className="hover:text-primary transition-colors">Crear cuenta</Link></li>
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Transparencia</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Todos los precios provienen de tiendas oficiales y retailers autorizados.
              No vendemos productos: te ayudamos a comparar y ahorrar.
            </p>
            <p className="text-xs text-muted-foreground">
              Los precios pueden variar. Verificar siempre en la tienda oficial antes de comprar.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 GlobalWear. Precios reales de tiendas oficiales verificadas.</p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-primary transition-colors">Iniciar Sesión</Link>
            <Link to="/registro" className="hover:text-primary transition-colors">Registrarse</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
