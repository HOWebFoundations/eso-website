// GET /api/decrees  — public, read-only list of published decrees.
import { list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'GET') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  try {
    const { blobs } = await list({ prefix: 'meta/', limit: 1000 });
    const metas = await Promise.all(
      blobs
        .filter(b => b.pathname.endsWith('.json'))
        .map(async b => {
          try {
            const r = await fetch(b.url, { cache: 'no-store' });
            if (!r.ok) return null;
            const m = await r.json();
            return {
              id: m.id || '',
              karar: m.karar || '',
              title: m.title || '',
              date: m.date || '',
              url: m.url || '',
            };
          } catch { return null; }
        })
    );

    const items = metas.filter(Boolean).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(items));
  } catch (e) {
    res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end('[]'); // fail soft — the site falls back to its static list
  }
}
