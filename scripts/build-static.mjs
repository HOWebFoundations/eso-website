// ============================================================================
//  Static site generator for ESO.
//  Slices the single-document SPA (index.html) into per-route, per-language
//  static HTML: one <head>, one <h1>, baked-in translations, real navigation.
//  Reuses the exact existing markup + style.css, so the design is unchanged.
// ============================================================================
import { parse } from 'node-html-parser';
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const DOMAIN = 'https://eso-acc.com';   // canonical/production domain
const LANGS = ['en', 'ar', 'fr'];
const PARSE_OPTS = { comment: true, blockTextElements: { script: true, style: true, noscript: true } };

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- Inputs ----
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const meta = JSON.parse(readFileSync(join(ROOT, 'meta-routes.json'), 'utf8'));

// translations dictionary (translations.js sets window.translations)
const tWin = {};
new Function('window', readFileSync(join(ROOT, 'translations.js'), 'utf8'))(tWin);
const T = tWin.translations;

// SLUG map (id -> path) from script.js
const scriptSrc = readFileSync(join(ROOT, 'script.js'), 'utf8');
const slugLit = scriptSrc.match(/const SLUG = (\{[\s\S]*?\n  \});/)[1];
const SLUG = new Function('return ' + slugLit)();

// path (with leading slash) -> section id
const PATH_TO_ID = {};
for (const id of Object.keys(SLUG)) {
  const p = SLUG[id];
  PATH_TO_ID['/' + p === '/' ? '/' : '/' + p] = id;
}
PATH_TO_ID['/'] = 'home';

// Which routes to build: every meta route we can map to a section id.
const ROUTES = Object.keys(meta.routes).filter((p) => PATH_TO_ID[p]);

function langUrl(lang, path) {
  const pre = lang === 'en' ? '' : '/' + lang;
  if (path === '/') return DOMAIN + (pre || '/');
  return DOMAIN + pre + path;
}
function outFile(lang, path) {
  const pre = lang === 'en' ? '' : '/' + lang;
  const p = path === '/' ? '' : path;
  return join(DIST, pre + p, 'index.html');
}
function setHead(head, sel, attr, val) { const el = head.querySelector(sel); if (el) el.setAttribute(attr, val); }

function buildPage(path, lang) {
  const id = PATH_TO_ID[path];
  const m = meta.routes[path] || {};
  const title = m.title || meta.defaults.siteName;
  const desc = m.description || '';
  const ogImage = m.ogImage || meta.defaults.ogImage;
  const canonical = langUrl(lang, path);

  const root = parse(html, PARSE_OPTS);

  // <html lang/dir>
  const htmlEl = root.querySelector('html');
  htmlEl.setAttribute('lang', lang);
  if (lang === 'ar') htmlEl.setAttribute('dir', 'rtl'); else htmlEl.removeAttribute('dir');

  // ---- Head ----
  const head = root.querySelector('head');
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

  // ---- Drop the SPA intro preloader (a per-navigation flash + LCP drag on a static site) ----
  const pre = root.querySelector('#eso-preloader');
  if (pre) pre.remove();

  // ---- Keep only this route's section (=> one <h1> per page) ----
  root.querySelectorAll('.page-view').forEach((sec) => {
    if (sec.getAttribute('id') === id) {
      const cls = (sec.getAttribute('class') || '');
      if (!/\bactive\b/.test(cls)) sec.setAttribute('class', cls + ' active');
    } else {
      sec.remove();
    }
  });

  // ---- Bake translations for this language ----
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = T[lang] && T[lang][key];
    if (val == null) return;
    if (el.rawTagName && el.rawTagName.toUpperCase() === 'OPTION') el.set_content(esc(val));
    else el.set_content(val);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = T[lang] && T[lang][key];
    if (val != null) el.setAttribute('placeholder', val);
  });

  // ---- Rewrite internal links for the language prefix ----
  if (lang !== 'en') {
    root.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href[0] !== '/' || href[1] === '/') return;         // external / protocol-relative
      if (/^\/(ar|fr)\//.test(href) || href === '/ar' || href === '/fr') return;
      if (/\.[a-z0-9]+($|\?)/i.test(href) || href.startsWith('/api')) return; // files / api
      a.setAttribute('href', '/' + lang + (href === '/' ? '' : href));
    });
  }

  // ---- Swap the SPA scripts for the static client ----
  root.querySelectorAll('script[src]').forEach((s) => {
    const src = s.getAttribute('src') || '';
    if (src.includes('/translations.js') || src.includes('/script.js')) s.remove();
  });
  const body = root.querySelector('body');
  body.insertAdjacentHTML('beforeend', '\n  <script defer src="/static-site.js"></script>\n');

  return '<!DOCTYPE html>\n' + root.querySelector('html').toString();
}

// ---- Generate ----
if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
let count = 0;
for (const path of ROUTES) {
  for (const lang of LANGS) {
    const out = outFile(lang, path);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, buildPage(path, lang));
    count++;
  }
}

// ---- Copy static assets ----
for (const asset of ['style.css', 'static-site.js', 'favicon.svg', 'robots.txt', 'llms.txt']) {
  const src = join(ROOT, asset);
  if (existsSync(src)) cpSync(src, join(DIST, asset));
}
if (existsSync(join(ROOT, 'images'))) cpSync(join(ROOT, 'images'), join(DIST, 'images'), { recursive: true });

console.log('Generated ' + count + ' pages (' + ROUTES.length + ' routes x ' + LANGS.length + ' langs) into dist/');
console.log('Routes:', ROUTES.join(', '));
