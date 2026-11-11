# Global-Wear

## Migrar el catálogo a Supabase

El proyecto incluye un migrador idempotente para crear las tablas `products` y `offers` y cargar el catálogo local mediante upsert. La clave pública no alcanza para crear tablas ni escribir con RLS: configura una Service Role Key y la conexión PostgreSQL privada en tu entorno, sin subirlas al repositorio.

En PowerShell:

```powershell
$env:SUPABASE_SECRET_KEY = "tu-secret-key"
$env:SUPABASE_DB_URL = "postgresql://postgres:[PASSWORD]@db.jhqxtjfkctrclyjyvaov.supabase.co:5432/postgres"
npm run migrate:supabase
```

Para no dejar credenciales en el historial de PowerShell, también puedes ejecutar `./scripts/run-migration.ps1`; solicitará ambas claves de forma segura y las eliminará al terminar.

El script puede ejecutarse varias veces: actualiza productos existentes y evita duplicar ofertas. Las cuentas de `auth.users` no se migran desde este script porque sus contraseñas y sesiones deben transferirse mediante las herramientas de Auth de Supabase.
