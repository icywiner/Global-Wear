import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AlertCircle, Search, Shield, UserCheck, Users, Clock3, Sparkles, Trash2, Lock, Unlock, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type ProfileRow = {
  id: string;
  user_id: string;
  display_name: string;
  email: string;
  is_admin: boolean;
  is_blocked: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string | null;
  login_count: number;
};

type ActivityRow = {
  id: string;
  user_id: string;
  event_type: string;
  payload: Record<string, string | number | boolean | null>;
  created_at: string;
};

export default function Admin() {
  const { user, loading, isAdmin } = useAuth();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [events, setEvents] = useState<ActivityRow[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;

    const load = async () => {
      const [profilesResult, eventsResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('id,user_id,display_name,email,is_admin,is_blocked,deleted_at,created_at,updated_at,last_sign_in_at,login_count')
          .order('created_at', { ascending: false }),
        supabase
          .from('activity_events')
          .select('id,user_id,event_type,payload,created_at')
          .order('created_at', { ascending: false })
          .limit(500),
      ]);

      if (profilesResult.error) setError(profilesResult.error.message);
      if (eventsResult.error) setError(eventsResult.error.message);

      setProfiles((profilesResult.data || []) as ProfileRow[]);
      setEvents((eventsResult.data || []) as ActivityRow[]);
    };

    void load();
  }, [isAdmin]);

  const visibleProfiles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return profiles.filter((profile) => {
      if (!normalized) return true;
      return [profile.display_name, profile.email, profile.user_id].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [profiles, query]);

  const metrics = useMemo(() => {
    const activeWindow = Date.now() - 1000 * 60 * 60 * 24 * 7;
    const activeUsers = profiles.filter((profile) => profile.last_sign_in_at && new Date(profile.last_sign_in_at).getTime() >= activeWindow && !profile.deleted_at).length;
    const totalLogins = profiles.reduce((sum, profile) => sum + (profile.login_count || 0), 0);
    const aiQueries = events.filter((event) => event.event_type === 'ai_query').length;
    const productViews = events.filter((event) => event.event_type === 'product_view').length;
    const comparisons = events.filter((event) => event.event_type === 'product_compare').length;
    const productSearches = events.filter((event) => event.event_type === 'product_search').length;

    return {
      totalUsers: profiles.filter((profile) => !profile.deleted_at).length,
      activeUsers,
      totalLogins,
      aiQueries,
      productViews,
      comparisons,
      productSearches,
    };
  }, [events, profiles]);

  const topBy = useMemo(() => {
    const countBy = (eventType: string, key: 'brand' | 'category' | 'country' | 'city') => {
      const map = new Map<string, number>();
      events.filter((event) => event.event_type === eventType).forEach((event) => {
        const value = String(event.payload?.[key] || '').trim();
        if (!value) return;
        map.set(value, (map.get(value) || 0) + 1);
      });
      return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    };

    return {
      brands: countBy('brand_select', 'brand'),
      categories: countBy('category_select', 'category'),
      countries: countBy('location_select', 'country'),
      cities: countBy('location_select', 'city'),
      ai: countBy('ai_query', 'brand'),
    };
  }, [events]);

  const updateProfile = async (profile: ProfileRow, patch: Partial<ProfileRow>) => {
    setBusyId(profile.id);
    setError('');
    const { error: updateError } = await supabase
      .from('profiles')
      .update(patch)
      .eq('id', profile.id);
    setBusyId(null);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setProfiles((current) => current.map((item) => (item.id === profile.id ? { ...item, ...patch } : item)));
  };

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Panel de administración</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">Actividad real, usuarios y métricas</h1>
            <p className="mt-2 text-sm text-muted-foreground">Acceso restringido para el administrador de GlobalWear.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            {user.email}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<Users className="h-4 w-4" />} label="Usuarios" value={metrics.totalUsers} />
        <MetricCard icon={<UserCheck className="h-4 w-4" />} label="Activos 7 días" value={metrics.activeUsers} />
        <MetricCard icon={<Clock3 className="h-4 w-4" />} label="Inicios de sesión" value={metrics.totalLogins} />
        <MetricCard icon={<Sparkles className="h-4 w-4" />} label="Consultas IA" value={metrics.aiQueries} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarPanel title="Marcas más buscadas" items={topBy.brands} />
        <BarPanel title="Categorías más visitadas" items={topBy.categories} />
        <BarPanel title="Países más seleccionados" items={topBy.countries} />
        <BarPanel title="Ciudades más seleccionadas" items={topBy.cities} />
      </div>

      <div className="rounded-[2rem] border border-border bg-card p-5 md:p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Usuarios registrados</h2>
            <p className="text-sm text-muted-foreground">Buscá, bloqueá o desactivá usuarios sin salir del panel.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar usuario..."
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-secondary/40 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Usuario</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Registro</th>
                <th className="px-4 py-3 font-medium">Último acceso</th>
                <th className="px-4 py-3 font-medium">Sesiones</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {visibleProfiles.map((profile) => (
                <tr key={profile.id} className="align-top">
                  <td className="px-4 py-3 font-medium text-foreground">{profile.display_name || profile.user_id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{profile.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(profile.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{profile.last_sign_in_at ? new Date(profile.last_sign_in_at).toLocaleString() : 'Sin actividad'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{profile.login_count}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${profile.deleted_at ? 'bg-slate-100 text-slate-700' : profile.is_blocked ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {profile.deleted_at ? 'Eliminado' : profile.is_blocked ? 'Bloqueado' : 'Activo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => updateProfile(profile, { is_blocked: !profile.is_blocked, updated_at: new Date().toISOString() })}
                        disabled={busyId === profile.id || profile.deleted_at !== null}
                        className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/60 disabled:opacity-50"
                      >
                        {profile.is_blocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                        {profile.is_blocked ? 'Desbloquear' : 'Bloquear'}
                      </button>
                      <button
                        type="button"
                        onClick={() => updateProfile(profile, { deleted_at: new Date().toISOString(), is_blocked: true, updated_at: new Date().toISOString() })}
                        disabled={busyId === profile.id || profile.deleted_at !== null}
                        className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/60 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Eliminar
                      </button>
                      <button
                        type="button"
                        onClick={() => updateProfile(profile, { deleted_at: null, is_blocked: false, updated_at: new Date().toISOString() })}
                        disabled={busyId === profile.id || profile.deleted_at === null}
                        className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/60 disabled:opacity-50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Restaurar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-4 text-3xl font-bold text-foreground">{value.toLocaleString()}</p>
    </div>
  );
}

function BarPanel({ title, items }: { title: string; items: Array<[string, number]> }) {
  const max = Math.max(...items.map(([, value]) => value), 1);

  return (
    <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay datos.</p>
        ) : (
          items.map(([label, value]) => (
            <div key={label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-foreground">{label}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/60">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${(value / max) * 100}%` }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}