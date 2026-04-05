import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const { user, signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Completá todos los campos');
      return;
    }
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    if (error) setError(error);
    setSubmitting(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <LogIn className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Space Grotesk' }}>
            Iniciar sesión
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ingresá a tu cuenta de GlobalWear
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-danger/10 border border-danger/30 text-danger rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Contraseña</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full bg-card border border-border rounded-xl px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿No tenés cuenta?{' '}
          <Link to="/registro" className="text-primary font-medium hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
