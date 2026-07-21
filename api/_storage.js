// Supabase Storage helpers (raw REST, no SDK needed).
// Uses SUPABASE_URL + SUPABASE_SECRET_KEY env vars. Bucket: "decrees" (public).
const BUCKET = 'decrees';

const base = () => (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const key = () => process.env.SUPABASE_SECRET_KEY || '';
const authHeaders = (extra = {}) => ({ Authorization: `Bearer ${key()}`, apikey: key(), ...extra });

export function publicUrl(path) {
  return `${base()}/storage/v1/object/public/${BUCKET}/${path}`;
}

export async function uploadObject(path, body, contentType) {
  const r = await fetch(`${base()}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': contentType, 'x-upsert': 'true' }),
    body,
  });
  if (!r.ok) throw new Error(`upload ${path} failed: ${r.status} ${await r.text().catch(() => '')}`);
  return r.json().catch(() => ({}));
}

export async function listObjects(prefix) {
  const r = await fetch(`${base()}/storage/v1/object/list/${BUCKET}`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ prefix, limit: 1000, sortBy: { column: 'name', order: 'asc' } }),
  });
  if (!r.ok) throw new Error(`list ${prefix} failed: ${r.status}`);
  const arr = await r.json();
  return Array.isArray(arr) ? arr : [];
}

export async function deleteObject(path) {
  const r = await fetch(`${base()}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return r.ok;
}

export async function fetchJson(path) {
  const r = await fetch(publicUrl(path), { cache: 'no-store' });
  if (!r.ok) return null;
  return r.json().catch(() => null);
}
