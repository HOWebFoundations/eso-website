// ============================================================================
//  Static site generator for ESO.
//  Slices the single-document SPA (index.html) into per-route, per-language
//  static HTML with baked-in translations AND the live CMS content (team,
//  leadership, contact, theme, images, wording, hidden studies) plus admin
//  articles as their own pages. Reuses the exact markup + style.css.
//
//  CMS content is read from Supabase at build time (SUPABASE_URL /
//  SUPABASE_SECRET_KEY env vars, present on Vercel). Without them, or with a
//  local scripts/.cms-mock.json, the build still runs on baked defaults.
// ============================================================================
import { parse } from 'node-html-parser';
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const DOMAIN = 'https://eso-acc.com';
const LANGS = ['en', 'ar', 'fr'];
const PARSE_OPTS = { comment: true, blockTextElements: { script: true, style: true, noscript: true } };
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- Inputs ----
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const meta = JSON.parse(readFileSync(join(ROOT, 'meta-routes.json'), 'utf8'));
const tWin = {};
new Function('window', readFileSync(join(ROOT, 'translations.js'), 'utf8'))(tWin);
const T = tWin.translations;
const scriptSrc = readFileSync(join(ROOT, 'script.js'), 'utf8');
const SLUG = new Function('return ' + scriptSrc.match(/const SLUG = (\{[\s\S]*?\n  \});/)[1])();

// ---- Load CMS content (Supabase, else local mock, else empty) ----
function envLocal() {
  const p = join(ROOT, '.env.local');
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
envLocal();
const SB = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SK = process.env.SUPABASE_SECRET_KEY || '';
const sbHeaders = { Authorization: `Bearer ${SK}`, apikey: SK };
async function sbGet(path) {
  if (!SB || !SK) return null;
  try { const r = await fetch(`${SB}/storage/v1/object/decrees/${path}`, { headers: sbHeaders }); return r.ok ? await r.json() : null; }
  catch { return null; }
}
async function sbList(prefix) {
  if (!SB || !SK) return [];
  try {
    const r = await fetch(`${SB}/storage/v1/object/list/decrees`, { method: 'POST', headers: { ...sbHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ prefix, limit: 1000, sortBy: { column: 'name', order: 'asc' } }) });
    const a = r.ok ? await r.json() : []; return Array.isArray(a) ? a : [];
  } catch { return []; }
}

let CMS = {}, ARTICLES = [];
const mockPath = join(ROOT, 'scripts', '.cms-mock.json');
if (SB && SK) {
  CMS = (await sbGet('site/content.json')) || {};
  const objs = await sbList('articles/');
  ARTICLES = (await Promise.all(objs.filter(o => o.name && o.name.endsWith('.json')).map(o => sbGet('articles/' + o.name)))).filter(Boolean);
} else if (existsSync(mockPath)) {
  const mock = JSON.parse(readFileSync(mockPath, 'utf8'));
  CMS = mock.content || {}; ARTICLES = mock.articles || [];
  console.log('[build] using local CMS mock');
} else {
  console.log('[build] no Supabase creds — building on defaults (no CMS overrides)');
}
ARTICLES.sort((a, b) => String(b.date).localeCompare(String(a.date)));

// ---- Fold global CMS content into the translation dict + image map ----
const IMAGES = Object.assign({}, CMS.images);
if (CMS.text) for (const l of LANGS) if (CMS.text[l]) for (const k in CMS.text[l]) { const v = CMS.text[l][k]; if (v != null && v !== '') (T[l] = T[l] || {})[k] = v; }
if (CMS.leadership) {
  const L = CMS.leadership;
  for (const l of LANGS) { if (L.role && L.role[l]) T[l].role_founder = L.role[l]; if (L.bio && L.bio[l]) T[l].desc_founder = L.bio[l]; }
  if (L.photo) IMAGES.ceo_portrait = L.photo;
}
const HIDDEN = (CMS.studies && Array.isArray(CMS.studies.hidden)) ? CMS.studies.hidden : [];

// ---- Fonts (kept in sync with window.ESO_FONTS in script.js) ----
const FONTS = {
  default: { head: "'Montserrat', sans-serif", body: "'Inter', sans-serif" },
  inter: { head: "'Inter', sans-serif", body: "'Inter', sans-serif" },
  playfair: { head: "'Playfair Display', serif", body: "'Inter', sans-serif", google: 'Playfair+Display:wght@500;600;700' },
  lora: { head: "'Lora', serif", body: "'Inter', sans-serif", google: 'Lora:wght@500;600;700' },
  poppins: { head: "'Poppins', sans-serif", body: "'Poppins', sans-serif", google: 'Poppins:wght@300;400;500;600;700' },
  system: { head: "system-ui, -apple-system, Segoe UI, sans-serif", body: "system-ui, -apple-system, Segoe UI, sans-serif" },
  georgia: { head: "Georgia, 'Times New Roman', serif", body: "Georgia, 'Times New Roman', serif" }
};

// ---- Routing ----
const PATH_TO_ID = {};
for (const id of Object.keys(SLUG)) { const p = SLUG[id]; PATH_TO_ID['/' + p === '/' ? '/' : '/' + p] = id; }
PATH_TO_ID['/'] = 'home';
const ARTICLE_SLUGS = ARTICLES.map(a => a.slug);
// Built-in routes we can map to a section, minus any built-in studies Elie hid.
const ROUTES = Object.keys(meta.routes).filter((p) => PATH_TO_ID[p] && !(/^\/insights\//.test(p) && HIDDEN.indexOf(p.replace('/insights/', '')) !== -1));

const langUrl = (lang, path) => { const pre = lang === 'en' ? '' : '/' + lang; return path === '/' ? DOMAIN + (pre || '/') : DOMAIN + pre + path; };
const outFile = (lang, path) => { const pre = lang === 'en' ? '' : '/' + lang; return join(DIST, pre + (path === '/' ? '' : path), 'index.html'); };
const setHead = (head, sel, attr, val) => { const el = head.querySelector(sel); if (el) el.setAttribute(attr, val); };
const fmtDate = (d, lang) => { const dt = new Date(d + 'T00:00:00'); if (isNaN(dt)) return d; try { return new Intl.DateTimeFormat({ en: 'en-US', fr: 'fr-FR', ar: 'ar' }[lang] || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(dt); } catch { return d; } };

// ---- Shared head + shell setup ----
function prepShell(root, lang, path, title, desc, ogImage) {
  const htmlEl = root.querySelector('html');
  htmlEl.setAttribute('lang', lang);
  if (lang === 'ar') htmlEl.setAttribute('dir', 'rtl'); else htmlEl.removeAttribute('dir');
  const head = root.querySelector('head');
  const canonical = langUrl(lang, path);
  const titleEl = head.querySelector('title'); if (titleEl) titleEl.set_content(esc(title));
  setHead(head, 'meta[name="description"]', 'content', desc);
  setHead(head, 'link[rel="canonical"]', 'href', canonical);
  setHead(head, 'link[rel="alternate"][hreflang="en"]', 'href', langUrl('en', path));
  setHead(head, 'link[rel="alternate"][hreflang="ar"]', 'href', langUrl('ar', path));
  setHead(head, 'link[rel="alternate"][hreflang="fr"]', 'href', langUrl('fr', path));
  setHead(head, 'link[rel="alternate"][hreflang="x-default"]', 'href', langUrl('en', path));
  setHead(head, 'meta[property="og:title"]', 'content', title);
  setHead(head, 'meta[property="og:description"]', 'content', desc);
  setHead(head, 'meta[property="og:url"]', 'content', canonical);
  setHead(head, 'meta[property="og:image"]', 'content', ogImage);
  setHead(head, 'meta[name="twitter:title"]', 'content', title);
  setHead(head, 'meta[name="twitter:description"]', 'content', desc);
  setHead(head, 'meta[property="og:locale"]', 'content', lang === 'ar' ? 'ar_LB' : lang === 'fr' ? 'fr_FR' : 'en_US');
  // Theme (colours + font) baked into every page
  if (CMS.theme) {
    const th = CMS.theme; let css = '';
    if (th.colors) { css += ':root{'; if (th.colors.navy) css += `--eso-logo-navy:${th.colors.navy};`; if (th.colors.accent) css += `--eso-accent:${th.colors.accent};`; if (th.colors.heroNavy) css += `--eso-navy:${th.colors.heroNavy};`; css += '}'; }
    const preset = FONTS[th.fontPreset];
    if (preset) {
      if (preset.google) head.insertAdjacentHTML('beforeend', `\n  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${preset.google}&display=swap">`);
      css += `body,p,a,span,li,td,th,div,input,textarea,button,select,label,.btn,.subtitle,.simple-nav-link{font-family:${preset.body} !important;}h1,h2,h3,h4,h5,h6,.canvas-title,.adv-icon,.stat-number{font-family:${preset.head} !important;}`;
    }
    if (css) head.insertAdjacentHTML('beforeend', `\n  <style id="eso-theme">${css}</style>`);
  }
  const pre = root.querySelector('#eso-preloader'); if (pre) pre.remove();
}

function bakeI18n(root, lang) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n'); const val = T[lang] && T[lang][key]; if (val == null) return;
    if (el.rawTagName && el.rawTagName.toUpperCase() === 'OPTION') el.set_content(esc(val)); else el.set_content(val);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder'); const val = T[lang] && T[lang][key]; if (val != null) el.setAttribute('placeholder', val);
  });
}

function applyCMS(root, id, lang) {
  // Images
  Object.keys(IMAGES).forEach((key) => {
    const url = IMAGES[key]; if (!url) return;
    root.querySelectorAll(`[data-img-key="${key}"]`).forEach((el) => {
      if ((el.rawTagName || '').toLowerCase() === 'img') { el.setAttribute('src', url); return; }
      let st = el.getAttribute('style') || '';
      if (/background-image\s*:\s*url\(/.test(st)) st = st.replace(/background-image\s*:\s*url\([^)]*\)/, `background-image: url('${url}')`);
      else if (/url\(/.test(st)) st = st.replace(/url\([^)]*\)/, `url('${url}')`);
      else st += `; background-image: url('${url}')`;
      el.setAttribute('style', st);
    });
  });
  // Team grid
  if (Array.isArray(CMS.team) && CMS.team.length) {
    const grid = root.querySelector('#staff-grid');
    if (grid) grid.set_content(CMS.team.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).map((m) =>
      `<div class="team-card"><div class="team-img" role="img" aria-label="${esc((m.name || '') + ', ESO Auditors and Consultants')}" style="background-image: url('${esc(m.photo || '')}');"></div><div class="team-info text-center"><h3>${esc(m.name || '')}</h3>${m.title ? `<p style="color:var(--eso-text-muted);font-size:0.85rem;margin-top:4px;">${esc(m.title)}</p>` : ''}</div></div>`).join(''));
  }
  // Leadership name
  if (CMS.leadership && CMS.leadership.name) { const nm = root.querySelector('#lead-name'); if (nm) nm.set_content(esc(CMS.leadership.name)); }
  // Contact
  if (CMS.contact) {
    const c = CMS.contact;
    const setTxt = (sel, v) => { if (v == null || String(v).trim() === '') return; const el = root.querySelector(sel); if (el) el.set_content(esc(v)); };
    setTxt('#contact-address', c.address); setTxt('#contact-pobox', c.poBox);
    if (c.email) { const em = root.querySelector('#contact-email'); if (em) { em.set_content(esc(c.email)); em.setAttribute('href', 'mailto:' + c.email); } root.querySelectorAll('.contact-form-submit').forEach((f) => f.setAttribute('action', 'https://formsubmit.co/' + c.email)); }
    let phones = c.phones; if (typeof phones === 'string') phones = phones.split(/[\n,]+/);
    if (Array.isArray(phones)) { phones = phones.map((p) => String(p).trim()).filter(Boolean); const pc = root.querySelector('#contact-phones'); if (pc && phones.length) pc.set_content(phones.map((p) => `<a href="tel:${p.replace(/[^\d+]/g, '')}" style="color: var(--eso-text-dark); text-decoration: none; display: inline-block; padding: 10px 0; position: relative; z-index: 10000;">${esc(p)}</a>`).join('<br>')); }
  }
  // News page: drop hidden built-in study cards + inject admin article cards
  if (id === 'news') {
    const grid = root.querySelector('#insights-grid');
    if (grid) {
      if (HIDDEN.length) grid.querySelectorAll('.insight-card').forEach((card) => { const link = card.querySelector('a.read-more, a.nav-router'); const href = link ? link.getAttribute('href') : ''; const slug = href ? href.replace(/^.*\/insights\//, '').replace(/[?#].*$/, '') : ''; if (slug && HIDDEN.indexOf(slug) !== -1) card.remove(); });
      if (ARTICLES.length) {
        const pre = (lang === 'en' ? '' : '/' + lang);
        const readLabel = { en: 'Read Full Study →', fr: "Lire l'étude →", ar: 'اقرأ المقال ←' }[lang] || 'Read Full Study →';
        const cards = ARTICLES.map((a) => { const t = (a.title && (a.title[lang] || a.title.en)) || ''; const d = (a.desc && (a.desc[lang] || a.desc.en)) || ''; return `<div class="insight-card no-image reveal active admin-card"><div class="insight-content"><span class="date">${esc(fmtDate(a.date, lang))}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><a class="read-more nav-router" href="${pre}/insights/${esc(a.slug)}">${readLabel}</a></div></div>`; }).join('');
        grid.insertAdjacentHTML('afterbegin', cards);
      }
    }
  }
}

function rewriteLinks(root, lang) {
  if (lang === 'en') return;
  root.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href[0] !== '/' || href[1] === '/') return;
    if (/^\/(ar|fr)\//.test(href) || href === '/ar' || href === '/fr') return;
    if (/\.[a-z0-9]+($|\?)/i.test(href) || href.startsWith('/api')) return;
    a.setAttribute('href', '/' + lang + (href === '/' ? '' : href));
  });
}
function swapScripts(root) {
  root.querySelectorAll('script[src]').forEach((s) => { const src = s.getAttribute('src') || ''; if (src.includes('/translations.js') || src.includes('/script.js')) s.remove(); });
  root.querySelector('body').insertAdjacentHTML('beforeend', '\n  <script defer src="/static-site.js"></script>\n');
}

// ---- Build a normal route page ----
function buildPage(path, lang) {
  const id = PATH_TO_ID[path]; const m = meta.routes[path] || {};
  const root = parse(html, PARSE_OPTS);
  prepShell(root, lang, path, m.title || meta.defaults.siteName, m.description || '', m.ogImage || meta.defaults.ogImage);
  root.querySelectorAll('.page-view').forEach((sec) => { if (sec.getAttribute('id') === id) { const cls = sec.getAttribute('class') || ''; if (!/\bactive\b/.test(cls)) sec.setAttribute('class', cls + ' active'); } else sec.remove(); });
  bakeI18n(root, lang);
  applyCMS(root, id, lang);
  rewriteLinks(root, lang);
  swapScripts(root);
  return '<!DOCTYPE html>\n' + root.querySelector('html').toString();
}

// ---- Build an admin-published article page ----
function buildArticlePage(a, lang) {
  const slug = a.slug; const path = '/insights/' + slug;
  const title = (a.title && (a.title[lang] || a.title.en)) || '';
  const desc = (a.desc && (a.desc[lang] || a.desc.en)) || '';
  const root = parse(html, PARSE_OPTS);
  prepShell(root, lang, path, title + ' | ESO Insights', desc, a.image || meta.defaults.ogImage);
  root.querySelectorAll('.page-view').forEach((sec) => { if (sec.getAttribute('id') === 'article-page') { const cls = sec.getAttribute('class') || ''; if (!/\bactive\b/.test(cls)) sec.setAttribute('class', cls + ' active'); } else sec.remove(); });
  bakeI18n(root, lang);
  // Fill the article template
  const q = (sel) => root.querySelector(sel);
  if (q('#article-title')) q('#article-title').set_content(esc(title));
  if (q('#article-crumb')) q('#article-crumb').set_content(esc(title));
  if (q('#article-date')) q('#article-date').set_content(esc(fmtDate(a.date, lang)));
  if (q('#article-cat')) q('#article-cat').set_content(esc(a.category || 'Insights'));
  const hdr = q('.study-header');
  if (hdr && a.image) hdr.setAttribute('style', `background: linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url('${a.image}') center/cover;`);
  const bodyEl = q('#article-body');
  if (bodyEl) bodyEl.set_content(String((a.body && (a.body[lang] || a.body.en)) || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join(''));
  applyCMS(root, 'article-page', lang);
  rewriteLinks(root, lang);
  swapScripts(root);
  return '<!DOCTYPE html>\n' + root.querySelector('html').toString();
}

// ---- Generate ----
if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
let count = 0;
for (const path of ROUTES) for (const lang of LANGS) { const out = outFile(lang, path); mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, buildPage(path, lang)); count++; }
for (const a of ARTICLES) for (const lang of LANGS) { const out = outFile(lang, '/insights/' + a.slug); mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, buildArticlePage(a, lang)); count++; }

// ---- Copy static assets ----
// eso-admin-*.html is the CMS admin (its own app); translations.js is loaded
// by that admin at runtime, so both must ship even though the public pages
// have their text baked in and never load translations.js.
const assets = ['style.css', 'static-site.js', 'favicon.svg', 'robots.txt', 'llms.txt', 'translations.js'];
for (const f of readdirSync(ROOT)) if (/^eso-admin-.*\.html$/.test(f)) assets.push(f);
for (const asset of assets) { const src = join(ROOT, asset); if (existsSync(src)) cpSync(src, join(DIST, asset)); }
if (existsSync(join(ROOT, 'images'))) cpSync(join(ROOT, 'images'), join(DIST, 'images'), { recursive: true });

console.log(`Generated ${count} pages: ${ROUTES.length} routes + ${ARTICLES.length} article(s), x ${LANGS.length} langs.`);
if (HIDDEN.length) console.log('Hidden built-in studies:', HIDDEN.join(', '));
