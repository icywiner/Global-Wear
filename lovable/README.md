# Sincronización de catálogo — Lovable / Local

Propósito
--
Este documento explica cómo ejecutar y desplegar la función de sincronización del catálogo (`lovable/sync_catalog.ts`) tanto en tu entorno local como en Lovable. La función valida imágenes, sube imágenes verificadas a Supabase Storage y genera índices por país en `catalogs/{country}/index.json`.

Requisitos
--
- Node 18+ (para desarrollo local)
- `npm install` (dependencias del proyecto)
- Cuenta y proyecto de Supabase con bucket `products` creado
- Secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SYNC_TOKEN`

Variables de entorno (obligatorias)
--
- `SUPABASE_URL` — URL del proyecto Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` — Service Role Key (DEBE permanecer en servidor, nunca en frontend).
- `ADMIN_SYNC_TOKEN` — token secreto para proteger el endpoint de sincronización.

Ejecución local (PowerShell)
--
1) Exporta las variables en la misma sesión de PowerShell:

```powershell
$env:SUPABASE_URL = "https://..."
$env:SUPABASE_SERVICE_ROLE_KEY = "eyJhbGci..."
$env:ADMIN_SYNC_TOKEN = "mi-token-secreto"
npm run start:sync-server
```

2) En otra terminal (o desde la misma después de arrancar), dispara la sincronización:

```powershell
curl.exe -X POST http://localhost:4001/sync -H "Authorization: Bearer mi-token-secreto" -H "Content-Type: application/json" -d '{}'
```

3) Verifica los resultados:
- Revisa `sync-logs/` para los archivos `.json` generados por la ejecución (si aplicable).
- Abre el dashboard de Supabase → Storage → `products` y confirma que las rutas siguen la estructura `products/{brand}/{country}/{product-id}.jpg`.
- Comprueba los índices: `catalogs/{country}/index.json` dentro del bucket `products`.

Despliegue en Lovable (recomendado para producción)
--
1) En el panel de Lovable crea una nueva función/edge function y sube `lovable/sync_catalog.ts`.
2) Configura runtime compatible (Deno/TypeScript) si Lovable lo requiere.
3) En la sección de Secrets/Environment Variables añade:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (Service Role Key — mantener privado)
   - `ADMIN_SYNC_TOKEN`
4) Asigna una ruta pública protegida (ej: `POST /sync`) y habilita CORS/OPTIONS si es necesario.
5) Prueba con:

```bash
curl -X POST https://<tu-funcion-lovable> -H "Authorization: Bearer <ADMIN_SYNC_TOKEN>" -H "Content-Type: application/json" -d '{}'
```

Buenas prácticas y seguridad
--
- NUNCA exponer `SUPABASE_SERVICE_ROLE_KEY` en el frontend ni en repos públicos.
- Limita el `ADMIN_SYNC_TOKEN` y rotalo periódicamente.
- Revisar `sync-logs/` tras cada ejecución para detectar productos con errores (no reemplazar por placeholders automáticamente).
- Implementar rate-limits y auditoría en producción.

Verificación automatizada (sugerida)
--
- Crear un job que verifique periódicamente que `catalogs/{country}/index.json` existe y que las URLs referidas responden con `Content-Type: image/*`.
- Registrar discrepancias en una tabla de errores en Supabase o en logs centralizados.

Soporte
--
Si quieres, puedo:
- Generar una ruta de administración (interfaz) para disparar la sincronización (sin cambiar diseño existente).
- Añadir scripts de verificación automática y plantillas SQL para una tabla `catalog_sync_errors` en Supabase.

Archivo principal de la función: [lovable/sync_catalog.ts](lovable/sync_catalog.ts)
