// Shared helpers for the decrees admin functions.
// Only Node built-ins here (no @vercel/blob) so this stays trivially testable.
import crypto from 'node:crypto';

const COOKIE = 'eso_sess';
const TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function b64url(buf) {
  return Buffer.from(buf).toString('base64url');
}

export function secret() {
  return process.env.SESSION_SECRET || '';
}

// Constant-time password comparison (hash first so lengths always match).
export function passwordOk(input) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  const a = crypto.createHash('sha256').update(String(input)).digest();
  const b = crypto.createHash('sha256').update(String(expected)).digest();
  return crypto.timingSafeEqual(a, b);
}

export function signSession() {
  const payload = b64url(JSON.stringify({ exp: Date.now() + TTL_MS }));
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function isAuthed(req) {
  try {
    const raw = getCookie(req, COOKIE);
    if (!raw) return false;
    const [payload, sig] = raw.split('.');
    if (!payload || !sig) return false;
    const expect = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expect);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function getCookie(req, name) {
  const header = req.headers.cookie || '';
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return null;
}

export function setSessionCookie(res, value, maxAgeSec) {
  const attrs = [
    `${COOKIE}=${value}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${maxAgeSec}`,
  ];
  res.setHeader('Set-Cookie', attrs.join('; '));
}

export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { return {}; }
}

export function json(res, status, obj) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(obj));
}
