// GET /api/articles, public, read-only list of admin-published insight articles.
import { listObjects, fetchJson } from './_storage.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'GET') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  try {
    const objs = await listObjects('articles/');
    const arr = await Promise.all(
      objs.filter(o => o.name && o.name.endsWith('.json')).map(o => fetchJson('articles/' + o.name))
    );
    const items = arr.filter(Boolean).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(items));
  } catch (e) {
    // fail soft
    res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end('[]');
  }
}
