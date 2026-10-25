import http from 'http';
import { syncCatalog } from '../src/services/catalogSyncService.ts';
const PORT = Number(process.env.SYNC_SERVER_PORT || 4001);
const ADMIN_TOKEN = process.env.ADMIN_SYNC_TOKEN; // secret token for auth

if (!ADMIN_TOKEN) {
  console.warn('Warning: ADMIN_SYNC_TOKEN not set. Endpoint will be disabled.');
}

function sendJson(res: http.ServerResponse, status: number, body: any) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': String(Buffer.byteLength(payload)) });
  res.end(payload);
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Authorization, Content-Type' });
    res.end();
    return;
  }

  if (req.url === '/sync' && req.method === 'POST') {
    if (!ADMIN_TOKEN) return sendJson(res, 503, { error: 'Admin token not configured' });

    const auth = req.headers.authorization || req.headers['authorization'];
    const token = typeof auth === 'string' && auth.startsWith('Bearer ') ? auth.slice(7) : req.headers['x-admin-token'];

    if (token !== ADMIN_TOKEN) {
      return sendJson(res, 401, { error: 'Unauthorized' });
    }

    let body = '';
    for await (const chunk of req) body += chunk;
    let payload: any = {};
    try {
      payload = body ? JSON.parse(body) : {};
    } catch {
      return sendJson(res, 400, { error: 'Invalid JSON' });
    }

    try {
      // Allow passing options: country, brands, fetchOfficial
      let body = '';
      for await (const chunk of req) body += chunk;
      let payload: any = {};
      try { payload = body ? JSON.parse(body) : {}; } catch { payload = {}; }

      const opts: any = {};
      if (payload.country) opts.country = payload.country;
      if (payload.brands) opts.brands = payload.brands;
      if (payload.fetchOfficial) opts.fetchOfficial = !!payload.fetchOfficial;

      const result = await syncCatalog(opts);
      return sendJson(res, 200, { ok: true, result });
    } catch (err: any) {
      console.error('Sync error:', err);
      return sendJson(res, 500, { ok: false, error: String(err?.message || err) });
    }
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Sync API listening on http://localhost:${PORT}/sync`);
});
