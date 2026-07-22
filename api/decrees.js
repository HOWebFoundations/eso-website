// GET /api/decrees, public, read-only list of published decrees (from Supabase Storage).
import { listObjects, fetchJson } from './_storage.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'GET') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  try {
    const objs = await listObjects('meta/');
    const metas = await Promise.all(
      objs
        .filter(o => o.name && o.name.endsWith('.json'))
        .map(async o => {
          const m = await fetchJson('meta/' + o.name);
          if (!m) return null;
          return {
            id: m.id || '',
            number: m.number || m.karar || '',
            type: m.type || 'Decree',
            origin: m.origin || '',
            description: m.description || m.title || '',
            date: m.date || '',
            url: m.url || '',
          };
        })
    );

    const items = metas.filter(Boolean).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(items));
  } catch (e) {
    // fail soft, the site falls back to its static list
    res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end('[]');
  }
}
