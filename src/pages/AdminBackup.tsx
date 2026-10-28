import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Download, Database, Link2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { buildBackupZip, downloadBlob, testConnection } from '@/lib/backup';

export default function AdminBackup() {
  const { isAdmin, checking } = useIsAdmin();
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [ready, setReady] = useState<{ blob: Blob; name: string; saved: number; missing: number } | null>(null);

  if (checking) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  const hasTarget = url.trim() !== '' && key.trim() !== '';

  const handleTest = async () => {
    setTesting(true);
    setStatus(await testConnection(url.trim(), key.trim()));
    setTesting(false);
  };

  const handleBuild = async () => {
    setReady(null);
    setProgress({ done: 0, total: 1 });
    const res = await buildBackupZip(hasTarget ? { url: url.trim(), anonKey: key.trim() } : null, (done, total) => setProgress({ done, total }));
    const name = `globalwear-backup-${new Date().toISOString().slice(0, 10)}.zip`;
    setReady({ ...res, name });
    setProgress(null);
  };

  const inputCls = 'h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring';

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Backup completo</h1>
        <p className="mt-2 text-muted-foreground">Descargá un archivo con la estructura de la base, el catálogo, los precios, las fotos y los detalles de la app, listo para instalar en otra base de datos.</p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-semibold text-foreground"><Link2 className="h-5 w-5 text-primary" />Base de datos de destino (opcional)</div>
        <p className="text-sm text-muted-foreground">Pegá la dirección y la clave pública (anon) del proyecto nuevo. Se guardan dentro del backup para reconectar la app; no se almacenan acá.</p>
        <input className={inputCls} placeholder="https://tu-proyecto.supabase.co" value={url} onChange={e => { setUrl(e.target.value); setStatus(null); }} />
        <input className={inputCls} placeholder="Clave pública (anon key)" value={key} onChange={e => { setKey(e.target.value); setStatus(null); }} type="password" autoComplete="off" />
        <button onClick={handleTest} disabled={!hasTarget || testing} className="h-11 rounded-xl bg-secondary px-5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50">
          {testing ? 'Probando...' : 'Probar conexión'}
        </button>
        {status && (
          <div className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${status.ok ? 'border-primary/30 bg-primary/10 text-primary' : 'border-danger/30 bg-danger/10 text-danger'}`}>
            {status.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
            <span>{status.message}</span>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-semibold text-foreground"><Database className="h-5 w-5 text-primary" />Generar backup</div>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Estructura de la base (usuarios, roles, permisos y catálogo)</li>
          <li>Todos los productos, precios, tiendas, países y ciudades</li>
          <li>Fotos de los productos e instrucciones de instalación</li>
        </ul>
        {!ready ? (
          <button onClick={handleBuild} disabled={!!progress} className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
            {progress ? <><Loader2 className="h-4 w-4 animate-spin" />Preparando fotos {progress.done}/{progress.total}</> : <><Database className="h-4 w-4" />Preparar backup</>}
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-foreground">Listo: {ready.saved} fotos guardadas{ready.missing > 0 && `, ${ready.missing} solo como enlace (la tienda no permitió bajarlas)`}.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => downloadBlob(ready.blob, ready.name)} className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90">
                <Download className="h-4 w-4" />Descargar backup
              </button>
              <button onClick={() => setReady(null)} className="h-12 rounded-xl bg-secondary px-5 text-sm font-semibold text-secondary-foreground">Generar de nuevo</button>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">Las cuentas y contraseñas de los usuarios no se incluyen por seguridad.</p>
      </section>
    </div>
  );
}
