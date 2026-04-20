import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';

export default function Login() {
  const { user, signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
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
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <aside className="relative overflow-hidden rounded-[2rem] bg-slate-950/95 p-8 text-white shadow-2xl ring-1 ring-white/10 sm:p-10">
            <span className="absolute -right-16 top-8 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
            <span className="absolute left-8 top-24 h-28 w-28 rounded-full bg-slate-200/10 blur-3xl" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-200">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                GlobalWear Compare
              </span>

              <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Descubrí precios reales en todo el mundo
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                Compara marcas premium entre +10 ciudades, encuentra las mejores ofertas y ahorra en tu ropa favorita.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Cobertura</p>
                  <p className="mt-4 text-2xl font-semibold text-white">+10 Ciudades</p>
                  <p className="mt-2 text-sm text-slate-400">Dubai, Paris, Tokyo, NY...</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Ahorro</p>
                  <p className="mt-4 text-2xl font-semibold text-white">Hasta 40%</p>
                  <p className="mt-2 text-sm text-slate-400">En marcas premium</p>
                </div>
              </div>

              <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Confían en nosotros</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-200">
                  <div className="flex items-center gap-2 rounded-full bg-slate-900/75 px-3 py-2 text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold">A</span>
                    ABC
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-900/75 px-3 py-2 text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold">B</span>
                    DEF
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-900/75 px-3 py-2 text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold">C</span>
                    GHI
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-400">+2500 usuarios activos</p>
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-slate-200/70 bg-white shadow-2xl">
            <div className="p-8 sm:p-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Bienvenido</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
                  Iniciá sesión en tu cuenta
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Accede a tu panel, compara precios y descubre ofertas internacionales.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 rounded-3xl border border-rose-200/80 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">Contraseña</label>
                    <button type="button" className="text-sm font-medium text-cyan-600 hover:text-cyan-700">
                      ¿Olvidaste?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(prev => !prev)}
                    className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="remember" className="text-sm text-slate-600">
                    Recordarme en este dispositivo
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Ingresando...' : 'Iniciar sesión'}
                </button>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <LogIn className="h-4 w-4" />
                  Continuar con Google
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                ¿No tenés cuenta?{' '}
                <Link to="/registro" className="font-semibold text-cyan-600 hover:text-cyan-700">
                  Creá una ahora
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
