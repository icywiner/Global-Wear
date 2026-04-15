import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, ChevronDown, User, LogOut, Compass, Sparkles } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { useAuth } from '@/context/AuthContext';
import { countries } from '@/data/locations';
import { catalogProducts } from '@/data/catalog';
import { useState, useRef, useEffect, useMemo } from 'react';

export default function Navbar() {
  const { country, city, setCountry, setCity, resetLocation } = useLocation();
  const { user, displayName, signOut, loading } = useAuth();
  const [countryOpen, setCountryOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const searchSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return catalogProducts
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explorar?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-card/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-foreground" style={{ fontFamily: 'Space Grotesk' }}>
              GlobalWear
            </span>
            <p className="text-[10px] text-muted-foreground -mt-0.5">Compare</p>
          </div>
        </Link>

        {/* Search bar - center */}
        <form onSubmit={handleSearch} ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-auto relative">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por producto o marca"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="w-full bg-secondary/70 border border-border/80 rounded-full pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
            />
          </div>

          {searchOpen && searchSuggestions.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50">
              {searchSuggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    navigate(`/producto/${item.id}`);
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-secondary/70 transition-colors border-b border-border/60 last:border-0"
                >
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Explorar link */}
          <Link
            to="/explorar"
            className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            <Compass className="w-4 h-4" />
            Explorar
          </Link>

          <Link
            to="/"
            className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            <Sparkles className="w-4 h-4" />
            Inicio
          </Link>

          {/* Country selector */}
          <div className="relative" ref={countryRef}>
            <button
              onClick={() => setCountryOpen(!countryOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              {country ? (
                <>
                  <span>{country.flag}</span>
                  <span className="hidden sm:inline">{country.name}{city ? ` · ${city.name}` : ''}</span>
                </>
              ) : (
                <span className="text-muted-foreground">Seleccionar país</span>
              )}
              <ChevronDown className="w-3 h-3" />
            </button>

            {countryOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-xl w-64 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Seleccionar país
                  </p>
                </div>
                {countries.map(c => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountry(c);
                      // Auto-select first city
                      if (c.cities.length > 0) {
                        setCity(c.cities[0]);
                      }
                      setCountryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-accent/10 flex items-center justify-between transition-colors ${
                      country?.code === c.code ? 'bg-primary/5 font-semibold text-primary' : 'text-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{c.currency}</span>
                  </button>
                ))}
                {country && (
                  <div className="p-2 border-t border-border">
                    <button
                      onClick={() => { resetLocation(); setCountryOpen(false); }}
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
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-xl w-48 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground truncate">{displayName || 'Usuario'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { signOut(); setUserMenuOpen(false); }}
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
