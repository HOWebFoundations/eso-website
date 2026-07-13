// POST /api/admin  — JSON actions: session | login | logout | delete
import { list, del } from '@vercel/blob';
import { passwordOk, signSession, isAuthed, setSessionCookie, readJson, json } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') { json(res, 405, { error: 'method_not_allowed' }); return; }

  const body = await readJson(req);
  const action = String(body.action || '');

  // --- public: is the current visitor logged in? ---
  if (action === 'session') {
    json(res, 200, { authed: isAuthed(req) });
    return;
  }

  // --- login ---
  if (action === 'login') {
    // small constant delay to blunt brute force
    await new Promise(r => setTimeout(r, 400));
    if (passwordOk(body.password)) {
      setSessionCookie(res, signSession(), 8 * 60 * 60);
      json(res, 200, { ok: true });
    } else {
      json(res, 401, { error: 'bad_password' });
    }
    return;
  }

  // --- logout ---
  if (action === 'logout') {
    setSessionCookie(res, 'x', 0);
    json(res, 200, { ok: true });
    return;
  }

  // --- everything below requires auth ---
  if (!isAuthed(req)) { json(res, 401, { error: 'unauthorized' }); return; }

  if (action === 'delete') {
    const id = String(body.id || '');
    if (!id) { json(res, 400, { error: 'missing_id' }); return; }
    try {
      const { blobs } = await list({ prefix: `meta/${id}`, limit: 10 });
      if (!blobs.length) { json(res, 404, { error: 'not_found' }); return; }
      for (const b of blobs) {
        try {
          const r = await fetch(b.url, { cache: 'no-store' });
          if (r.ok) { const m = await r.json(); if (m.url) await del(m.url); }
        } catch {}
        await del(b.url);
      }
      json(res, 200, { ok: true });
    } catch (e) {
      json(res, 500, { error: 'delete_failed' });
    }
    return;
  }

  json(res, 400, { error: 'unknown_action' });
}
