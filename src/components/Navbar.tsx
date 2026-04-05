import { Link } from 'react-router-dom';
import { MapPin, Globe, ChevronDown, User, LogOut } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { useAuth } from '@/context/AuthContext';
import { countries } from '@/data/locations';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { country, city, setCountry, setCity, resetLocation } = useLocation();
  const { user, displayName, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Globe className="w-7 h-7 text-primary" />
          <span className="font-bold text-xl tracking-tight text-foreground" style={{ fontFamily: 'Space Grotesk' }}>
            GlobalWear
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {country && (
            <Link
              to="/explorar"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Explorar
            </Link>
          )}

          {/* Location selector */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {country ? (
                <span className="hidden sm:inline">
                  {country.flag} {city ? city.name : country.name}
                </span>
              ) : (
                <span className="hidden sm:inline">Ubicación</span>
              )}
              <ChevronDown className="w-3 h-3" />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg w-64 overflow-hidden">
                <div className="p-3 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Seleccionar ubicación
                  </p>
                </div>
                {countries.map(c => (
                  <div key={c.code}>
                    <button
                      onClick={() => {
                        setCountry(c);
                        if (country?.code !== c.code) return;
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent/10 flex items-center gap-2 transition-colors ${
                        country?.code === c.code ? 'bg-primary/5 font-semibold text-primary' : 'text-foreground'
                      }`}
                    >
                      <span className="text-lg">{c.flag}</span>
                      {c.name}
                    </button>
                    {country?.code === c.code && (
                      <div className="pl-10 pb-1">
                        {c.cities.map(ci => (
                          <button
                            key={ci.id}
                            onClick={() => {
                              setCity(ci);
                              setOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                              city?.id === ci.id
                                ? 'bg-primary text-primary-foreground font-medium'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                            }`}
                          >
                            {ci.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {country && (
                  <div className="p-2 border-t border-border">
                    <button
                      onClick={() => {
                        resetLocation();
                        setOpen(false);
                      }}
                      className="w-full text-center text-xs text-muted-foreground hover:text-danger transition-colors py-1"
                    >
                      Cambiar ubicación
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Auth */}
          {!loading && (
            user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {displayName || 'Mi cuenta'}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg w-48 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground truncate">{displayName || 'Usuario'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-danger/10 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Ingresar</span>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
