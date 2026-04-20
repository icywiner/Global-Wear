import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function Register() {
  const { user, signUp, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (user) return <Navigate to="/" replace />;

  const pwValid = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Completá todos los campos');
      return;
    }

    if (!pwValid) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setSubmitting(true);
    const { error } = await signUp(email.trim(), password, name.trim());
    if (error) {
      setError(error);
    } else {
      setSuccess(true);
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white shadow-2xl p-8 sm:p-10">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-semibold text-slate-950">¡Cuenta creada!</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Revisá tu email para confirmar tu cuenta y luego iniciá sesión.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                Ir a iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                Creá tu cuenta y empieza a comparar
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                Registrate en segundos para explorar precios globales, seguir tus marcas favoritas y ahorrar en cada compra.
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
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Registro</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
                  Creá tu cuenta en GlobalWear
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Completá el formulario para acceder a comparaciones internacionales y ofertas exclusivas.
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
                  <label className="block text-sm font-medium text-slate-700">Nombre completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Tu nombre"
                    maxLength={100}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    maxLength={255}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
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
                  {password.length > 0 && (
                    <p className={`text-xs ${pwValid ? 'text-emerald-600' : 'text-slate-500'} mt-1`}>
                      {pwValid ? '✓ Contraseña válida' : `${password.length}/6 caracteres mínimos`}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Al continuar, aceptas nuestros{' '}
                <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-700">
                  Términos de servicio
                </a>{' '}
                y{' '}
                <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-700">
                  Política de privacidad
                </a>.
              </p>

              <p className="mt-5 text-center text-sm text-slate-500">
                ¿Ya tenés cuenta?{' '}
                <Link to="/login" className="font-semibold text-cyan-600 hover:text-cyan-700">
                  Iniciá sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
