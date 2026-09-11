import { syncCatalog } from '../src/services/catalogSyncService.ts';
import fs from 'fs/promises';
import path from 'path';

export async function runScript(options?: { fetchOfficial?: boolean; country?: string; brands?: string[] }) {
  const res = await syncCatalog({ fetchOfficial: !!options?.fetchOfficial, country: options?.country, brands: options?.brands });

  const log = { startedAt: new Date().toISOString(), items: res, summary: { total: res.length, successes: res.filter((r: any) => r.ok).length } };
  const outDir = path.join(process.cwd(), 'sync-logs');
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `sync-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  await fs.writeFile(outFile, JSON.stringify(log, null, 2), 'utf-8');

  return { summary: log.summary, logFile: outFile, items: res };
}

if (import.meta.url === `file://${process.argv[1]}` || (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].endsWith('sync-catalog.ts'))) {
  (async () => {
    try {
      const args = process.argv.slice(2);
      const fetchOfficial = args.includes('--official');
      const countryArg = args.find((a) => a.startsWith('--country='));
      const country = countryArg ? countryArg.split('=')[1] : undefined;
      const res = await runScript({ fetchOfficial, country });
      console.log('Sync finished:', res.summary);
      console.log('Local log:', res.logFile);
    } catch (err) {
      console.error('Fatal:', err);
      process.exit(1);
    }
  })();
}
