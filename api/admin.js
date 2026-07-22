// POST /api/admin, JSON actions: session | login | logout | delete | save-article | delete-article
import crypto from 'node:crypto';
import { fetchJson, deleteObject, uploadObject } from './_storage.js';
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
      const meta = await fetchJson(`meta/${id}.json`);
      if (!meta) { json(res, 404, { error: 'not_found' }); return; }
      await deleteObject(`pdf/${id}.pdf`);
      await deleteObject(`meta/${id}.json`);
      json(res, 200, { ok: true });
    } catch (e) {
      json(res, 500, { error: 'delete_failed' });
    }
    return;
  }

  // --- create or update an insight article (trilingual) ---
  if (action === 'save-article') {
    const langs = ['en', 'fr', 'ar'];
    const b = body.article || {};
    const clip = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
    const pick = (o, n) => { const r = {}; langs.forEach(l => { r[l] = clip(o && o[l], n); }); return r; };
    const title = pick(b.title, 300);
    if (!title.en) { json(res, 400, { error: 'no_title_en' }); return; }
    const slugify = (s) => String(s || '').toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80);
    const id = clip(b.id, 12).replace(/[^a-z0-9]/gi, '') || crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    const slug = slugify(b.slug || title.en) || id;
    let date = String(b.date || '').trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) date = new Date().toISOString().slice(0, 10);
    const article = {
      id, slug, date,
      category: clip(b.category || 'Insights', 60),
      image: clip(b.image, 600),
      title, desc: pick(b.desc, 500), body: pick(b.body, 20000),
      updated: new Date().toISOString()
    };
    try {
      await uploadObject(`articles/${id}.json`, Buffer.from(JSON.stringify(article)), 'application/json');
      json(res, 200, { ok: true, article });
    } catch (e) {
      json(res, 500, { error: 'store_failed', message: String((e && e.message) || e) });
    }
    return;
  }

  if (action === 'delete-article') {
    const id = String(body.id || '');
    if (!id) { json(res, 400, { error: 'missing_id' }); return; }
    try { await deleteObject(`articles/${id}.json`); json(res, 200, { ok: true }); }
    catch (e) { json(res, 500, { error: 'delete_failed' }); }
    return;
  }

  // --- CMS content overrides: text (Phase 4), images (Phase 5), team + leadership (Phase 3) ---
  if (action === 'save-content') {
    const section = String(body.section || '');
    if (['text', 'images', 'team', 'leadership', 'contact', 'theme', 'studies'].indexOf(section) === -1) { json(res, 400, { error: 'bad_section' }); return; }
    try {
      let content = await fetchJson('site/content.json');
      if (!content || typeof content !== 'object' || Array.isArray(content)) content = {};
      content[section] = body.data;
      await uploadObject('site/content.json', Buffer.from(JSON.stringify(content)), 'application/json');
      json(res, 200, { ok: true });
    } catch (e) {
      json(res, 500, { error: 'store_failed', message: String((e && e.message) || e) });
    }
    return;
  }

  json(res, 400, { error: 'unknown_action' });
}
