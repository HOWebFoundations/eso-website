// GET /api/content, public, returns the CMS content overrides (text, images, team).
import { fetchJson } from './_storage.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'GET') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  try {
    const c = await fetchJson('site/content.json');
    res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(c && typeof c === 'object' ? c : {}));
  } catch (e) {
    res.status(200).setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end('{}');
  }
}
