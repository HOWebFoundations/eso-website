// ============================================================================
//  MoF DECREES BACKEND
//  Live decrees are served by the Vercel serverless function at /api/decrees
//  (uploads are managed from the secret admin page). Same origin, so no CORS.
//  Set to "" to force the static fallback list.
// ============================================================================
const DECREES_API = "/api/decrees";

// Trilingual dictionary now lives in /translations.js (shared with the admin CMS).
// It sets window.translations before this file runs; we alias it here.
const translations = window.translations || (window.translations = {});

document.addEventListener("DOMContentLoaded", () => {

  // 1. Preloader Logic
  const counter = document.getElementById('preloader-counter');
  const preloader = document.getElementById('eso-preloader');
  let count = 0;

  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 28) + 30;
    if (count > 100) count = 100;
    if (counter) counter.innerText = count + '%';
    if (count === 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        handleRouting();
      }, 200);
    }
  }, 55);

  // 2. Routing Logic (real URLs via the History API)
  const SITE_NAME = 'ESO | Auditors & Consultants';
  const DEFAULT_DESC = 'ESO Auditors & Consultants: Big 4 caliber audit, tax, accounting and advisory for enterprises in Lebanon and the MENA region. Trusted since 2001.';
  const META = {
    home: { t: 'ESO | Auditors & Consultants in Lebanon', d: DEFAULT_DESC },
    about: { t: 'About ESO | Audit & Advisory Firm in Lebanon', d: 'A quarter century of audit, tax and advisory expertise. The ESO standard: rigorous, independent, and rooted in local and international best practice.' },
    clients: { t: 'Our Clients | Industries ESO Serves in Lebanon', d: 'ESO serves 15+ sectors including food & beverage, manufacturing, real estate, healthcare, NGOs and financial services across Lebanon.' },
    'client-fb': { t: 'Food & Beverage Audit & Accounting | ESO Lebanon', d: 'Specialist F&B financial services: inventory and yield control, POS and aggregator reconciliation, franchise auditing, and NSSF and VAT optimization.' },
    team: { t: 'Leadership & Team | ESO Auditors & Consultants', d: 'Meet the ESO partners and professionals delivering audit, tax and advisory engagements across Lebanon and the region since 2001.' },
    services: { t: 'Services: Audit, Tax, Accounting & Consulting | ESO', d: 'The full spectrum of audit & assurance, tax advisory, accounting and corporate consulting, to Big 4 standards with boutique agility.' },
    'service-audit': { t: 'Audit & Assurance Services | ESO Lebanon', d: 'Independent statutory audits under ISA, IFRS compliance and transition, internal control reviews and agreed-upon procedures for enterprises in Lebanon.' },
    'service-tax': { t: 'Tax Advisory & VAT Compliance | ESO Lebanon', d: 'Corporate tax planning, VAT compliance, Ministry of Finance decree guidance and tax audit defense for businesses in Lebanon.' },
    'service-accounting': { t: 'Accounting & Payroll Services | ESO Lebanon', d: 'Outsourced bookkeeping, NSSF payroll, multi-currency reconciliation and management reporting for growing enterprises in Lebanon.' },
    'service-consulting': { t: 'Corporate Consulting & M&A Advisory | ESO Lebanon', d: 'M&A due diligence, enterprise valuation, outsourced CFO services and operational restructuring for enterprises in Lebanon and MENA.' },
    'lebanon-guide': { t: 'Doing Business in Lebanon: A 2026 Guide | ESO Auditors & Consultants', d: 'A practical guide to doing business in Lebanon: company structures, corporate tax, VAT and e-invoicing, NSSF payroll, IFRS reporting, banking and MoF decrees.' },
    'kararat-portal': { t: 'Laws and Decrees | ESO Lebanon', d: 'Official Lebanese laws, decrees and decisions, curated and instantly viewable by ESO Auditors & Consultants.' },
    news: { t: 'Insights & Technical Studies | ESO Lebanon', d: 'In-depth studies on IFRS, tax strategy, NSSF, valuation and audit standards for enterprises in Lebanon and the MENA region.' },
    careers: { t: 'Careers | Join ESO Auditors & Consultants', d: 'Build your career in audit, tax and consulting at ESO. Open roles for senior auditors, tax associates and summer interns in Lebanon.' },
    'client-portal': { t: 'Contact & Client Portal | ESO Lebanon', d: 'Contact ESO Auditors & Consultants in Jal El Dib, Lebanon. Schedule a consultation for audit, tax, accounting or advisory services.' }
  };

  // --- Pretty slugs + language-prefixed routes (en default, /ar, /fr) --------
  const SLUG = {
    home: '', about: 'about', services: 'services', team: 'team', careers: 'careers',
    'service-audit': 'services/audit-assurance',
    'service-tax': 'services/tax-advisory',
    'service-accounting': 'services/accounting-payroll',
    'service-consulting': 'services/corporate-consulting',
    clients: 'industries',
    'client-fb': 'industries/food-and-beverage',
    'lebanon-guide': 'lebanon-market-guide',
    'kararat-portal': 'ministry-of-finance-decrees',
    news: 'insights',
    'client-portal': 'contact',
    'study-1': 'insights/2026-budget-analysis',
    'study-2': 'insights/ifrs-18-transition',
    'study-3': 'insights/valuation-strategies',
    'study-4': 'insights/nssf-compliance',
    'study-5': 'insights/esg-reporting-frameworks',
    'study-6': 'insights/transfer-pricing-scrutiny',
    'study-7': 'insights/restructuring-distressed-assets',
    'study-8': 'insights/vat-recovery-bad-debts',
    'study-9': 'insights/ai-impact-on-auditing',
    'study-10': 'insights/holding-company-structures',
    'study-11': 'insights/real-estate-tax-landscape',
    'study-12': 'insights/ma-due-diligence-pitfalls',
    'study-13': 'insights/cybersecurity-financial-reporting',
    'study-14': 'insights/offshore-lebanon-vs-cyprus',
    'study-15': 'insights/cryptocurrency-asset-valuation',
    'study-16': 'insights/optimizing-working-capital',
    'study-17': 'insights/outsourced-cfo-role',
    'study-18': 'insights/ngo-corporate-governance',
    'study-19': 'insights/mid-year-2026-compliance-review',
    'study-20': 'insights/ifrs-19-simplified-disclosures',
    'study-21': 'insights/deposit-recovery-financial-gap-law',
    'study-22': 'insights/e-invoicing-shift'
  };
  const ID_BY_SLUG = {};
  Object.keys(SLUG).forEach((id) => { ID_BY_SLUG[SLUG[id]] = id; });
  const LANGS = ['ar', 'fr'];              // 'en' is the default and carries no prefix
  const OG_LOCALE = { en: 'en_US', ar: 'ar_LB', fr: 'fr_FR' };
  let currentLang = 'en';
  let booted = false;

  let currentArticleSlug = '';
  function pathForId(id, lang) {
    const prefix = (lang && lang !== 'en') ? '/' + lang : '';
    if (id === 'article-page') return prefix + '/' + (currentArticleSlug || 'insights');
    const slug = SLUG[id] || '';
    if (slug === '') return prefix || '/';
    return prefix + '/' + slug;
  }
  function findArticle(slug) {
    var arts = window.__esoArticles || [];
    for (var i = 0; i < arts.length; i++) if ('insights/' + arts[i].slug === slug) return arts[i];
    return null;
  }
  function renderArticle(art) {
    var sec = document.getElementById('article-page');
    if (!sec || !art) return;
    var L = currentLang;
    var pick = function (o) { return (o && (o[L] || o.en)) || ''; };
    var q = function (sel) { return sec.querySelector(sel); };
    var title = pick(art.title);
    if (q('#article-title')) q('#article-title').textContent = title;
    if (q('#article-crumb')) q('#article-crumb').textContent = title;
    var d = new Date(art.date + 'T00:00:00');
    var loc = { en: 'en-US', fr: 'fr-FR', ar: 'ar' }[L] || 'en-US';
    if (q('#article-date')) q('#article-date').textContent = isNaN(d.getTime()) ? art.date : d.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' });
    if (q('#article-cat')) q('#article-cat').textContent = art.category || 'Insights';
    var bodyEl = q('#article-body');
    if (bodyEl) {
      bodyEl.innerHTML = '';
      String(pick(art.body)).split(/\n\s*\n/).forEach(function (par) {
        par = par.trim(); if (!par) return;
        var p = document.createElement('p'); p.textContent = par; bodyEl.appendChild(p);
      });
    }
  }

  // Resolve any path (real URL or an English href in the markup) to a route.
  // Returns { lang, id, legacy } — legacy flags an old /id path to upgrade.
  function resolvePath(pathname) {
    let p = pathname || '/';
    try { p = decodeURIComponent(p); } catch (e) {}
    p = p.replace(/[?#].*$/, '').replace(/\/+$/, '');
    let lang = 'en';
    const segs = p.split('/').filter(Boolean);
    if (segs.length && LANGS.indexOf(segs[0]) !== -1) lang = segs.shift();
    const slug = segs.join('/');
    if (slug === '') return { lang: lang, id: 'home', legacy: false };
    if (Object.prototype.hasOwnProperty.call(ID_BY_SLUG, slug))
      return { lang: lang, id: ID_BY_SLUG[slug], legacy: false };
    const el = document.getElementById(slug);            // legacy /service-audit, /study-1
    if (el && el.classList.contains('page-view'))
      return { lang: lang, id: slug, legacy: true };
    if (findArticle(slug))                               // admin-published article
      return { lang: lang, id: 'article-page', slug: slug, legacy: false };
    return { lang: lang, id: 'home', legacy: false };
  }

  function setHeadTag(selector, attr, value) {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function applyMeta(id) {
    let m = META[id];
    if (!m) {
      const el = document.getElementById(id);
      const h = el && el.querySelector('.page-title');
      const p = el && el.querySelector('.study-article p');
      m = {
        t: h ? h.textContent.trim() + ' | ESO Insights' : SITE_NAME,
        d: p ? p.textContent.trim().replace(/\s+/g, ' ').slice(0, 155) : DEFAULT_DESC
      };
    }
    const origin = location.origin;
    const url = origin + pathForId(id, currentLang);
    document.title = m.t;
    setHeadTag('meta[name="description"]', 'content', m.d);
    setHeadTag('meta[property="og:title"]', 'content', m.t);
    setHeadTag('meta[property="og:description"]', 'content', m.d);
    setHeadTag('meta[property="og:url"]', 'content', url);
    setHeadTag('meta[property="og:locale"]', 'content', OG_LOCALE[currentLang] || 'en_US');
    setHeadTag('meta[name="twitter:title"]', 'content', m.t);
    setHeadTag('meta[name="twitter:description"]', 'content', m.d);
    setHeadTag('link[rel="canonical"]', 'href', url);
    setHeadTag('link[rel="alternate"][hreflang="en"]', 'href', origin + pathForId(id, 'en'));
    setHeadTag('link[rel="alternate"][hreflang="ar"]', 'href', origin + pathForId(id, 'ar'));
    setHeadTag('link[rel="alternate"][hreflang="fr"]', 'href', origin + pathForId(id, 'fr'));
    setHeadTag('link[rel="alternate"][hreflang="x-default"]', 'href', origin + pathForId(id, 'en'));
    buildStudySchema(id, url);
  }

  // Inject Article + FAQPage JSON-LD for study pages, built from the rendered,
  // already-translated DOM so it matches the active language. Removed elsewhere.
  function buildStudySchema(id, url) {
    var prev = document.getElementById('study-schema');
    if (prev) prev.remove();
    if (id.indexOf('study-') !== 0 && id !== 'lebanon-guide') return;
    var sec = document.getElementById(id);
    if (!sec) return;
    var titleEl = sec.querySelector('.page-title');
    var byEl = sec.querySelector('[data-i18n$="_by"]');
    var title = titleEl ? titleEl.textContent.trim() : document.title;
    var faqs = [];
    sec.querySelectorAll('.study-faq > div').forEach(function (row) {
      var q = row.querySelector('h4'); var a = row.querySelector('p');
      if (q && a) faqs.push({
        '@type': 'Question',
        name: q.textContent.trim(),
        acceptedAnswer: { '@type': 'Answer', text: a.textContent.trim() }
      });
    });
    var graph = [{
      '@type': 'Article',
      headline: title,
      inLanguage: currentLang,
      author: { '@type': 'Organization', name: (byEl ? byEl.textContent.trim() : 'ESO Auditors & Consultants') },
      publisher: { '@type': 'Organization', name: 'ESO Auditors & Consultants' },
      mainEntityOfPage: url
    }];
    if (faqs.length) graph.push({ '@type': 'FAQPage', mainEntity: faqs });
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'study-schema';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(s);
  }

  let currentRouteId = 'home';
  function handleRouting() {
    const info = resolvePath(location.pathname);

    // On the very first load at the bare root, honor a returning visitor's
    // saved language by upgrading the URL (crawlers have no storage -> English).
    if (!booted && info.lang === 'en' && (SLUG[info.id] || '') === ''
        && location.pathname.replace(/\/+$/, '') === '') {
      let saved = null;
      try { saved = localStorage.getItem('eso_lang'); } catch (e) {}
      if (saved && LANGS.indexOf(saved) !== -1) {
        info.lang = saved;
        history.replaceState({}, '', pathForId(info.id, saved));
      }
    }
    booted = true;

    // Upgrade a legacy /id path to its pretty slug (no extra history entry).
    if (info.legacy) history.replaceState({}, '', pathForId(info.id, info.lang));

    currentRouteId = info.id;
    currentLang = info.lang;
    if (info.id === 'article-page') { currentArticleSlug = info.slug; renderArticle(findArticle(info.slug)); }

    document.querySelectorAll('.page-view').forEach((page) => page.classList.remove('active'));
    const targetSection = document.getElementById(info.id);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo(0, 0);
      triggerReveals();
    }

    // Apply the language this URL implies (translations + dir + meta).
    if (typeof window.setLanguage === 'function') window.setLanguage(currentLang);
    else applyMeta(info.id);

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
  }

  // Intercept internal link clicks; markup hrefs are English pretty paths, so
  // resolve to an id and navigate in the language the visitor is viewing.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest('a.nav-router');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href[0] !== '/' || href[1] === '/') return;
    e.preventDefault();
    const rinfo = resolvePath(href);
    const target = (rinfo.id === 'article-page')
      ? ((currentLang && currentLang !== 'en' ? '/' + currentLang : '') + '/' + rinfo.slug)
      : pathForId(rinfo.id, currentLang);
    if (target !== location.pathname) history.pushState({}, '', target);
    handleRouting();
  });

  window.addEventListener('popstate', handleRouting);

  // Language switch = navigate to this same page in the chosen language.
  window.switchLanguage = function (lang) {
    if (lang !== 'en' && LANGS.indexOf(lang) === -1) lang = 'en';
    const target = pathForId(currentRouteId, lang);
    if (target !== location.pathname) history.pushState({}, '', target);
    handleRouting();
  };

  // Let the language switcher refresh the current page's title/description.
  window.__esoApplyMeta = () => applyMeta(currentRouteId);
  window.__esoRerouteArticles = function () {
    var info = resolvePath(location.pathname);
    if (info.id === 'article-page' && currentRouteId !== 'article-page') handleRouting();
  };

  handleRouting();

  // 3. Scroll Reveal Animation
  function triggerReveals() {
    const reveals = document.querySelectorAll('.page-view.active .reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 50;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', triggerReveals);

  // 4. Hamburger Menu Logic
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Mobile Dropdown toggling
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  navDropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.nav-dropbtn');
    if (dropbtn) {
      dropbtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.stopPropagation();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Close mobile menu when a simple link is clicked
  const simpleNavLinks = document.querySelectorAll('.nav-links > li > a:not(.nav-dropbtn)');
  simpleNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });

  // 5. Careers Apply Button Logic
  const applyBtns = document.querySelectorAll('.apply-btn');
  const positionSelect = document.getElementById('position');

  applyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      if (positionSelect) positionSelect.value = role;
      const applyForm = document.getElementById('apply-form');
      if (applyForm) applyForm.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 6. PDF Modal Logic (event-delegated so live-loaded decrees work too)
  const modal = document.getElementById('pdf-modal');
  const closeBtn = document.querySelector('.close-modal');
  const iframeContainer = document.getElementById('iframe-container');
  const SAMPLE_PDF = 'http://www.pdf995.com/samples/pdf.pdf';

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-pdf-btn');
    if (!btn) return;
    e.preventDefault();
    // Real uploaded decrees carry data-pdf-url (loaded directly, the Blob store
    // serves them inline). The static fallback items open a sample via gview.
    const real = btn.getAttribute('data-pdf-url');
    const src = real
      ? real
      : `https://docs.google.com/gview?url=${encodeURIComponent(SAMPLE_PDF)}&embedded=true`;
    if (iframeContainer) {
      iframeContainer.innerHTML = `<iframe src="${src}" width="100%" height="100%" frameborder="0" style="border:0;"></iframe>`;
    }
    if (modal) modal.style.display = 'block';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
      if (iframeContainer) iframeContainer.innerHTML = '';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      if (iframeContainer) iframeContainer.innerHTML = '';
    }
  });

  // 7. i18n - language is driven by the URL now (/ar, /fr). handleRouting()
  //    applies the right language and honors a saved preference on the root.

  // 8. Load MoF decrees live from the PHP backend (if DECREES_API is configured)
  if (typeof window.loadDecrees === 'function') {
    window.loadDecrees();
  }
  if (typeof window.loadArticles === 'function') {
    window.loadArticles();
  }
  if (typeof window.loadContent === 'function') {
    window.loadContent();
  }

});

// Exposed globally for onclick handlers in HTML
window.setLanguage = function(lang) {
  document.documentElement.lang = lang;
  document.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'OPTION') {
        el.textContent = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Keep live-loaded decrees in sync with the chosen language
  if (window.__esoDecrees && typeof window.renderDecrees === 'function') {
    window.renderDecrees();
  }
  if (typeof window.renderArticleCards === 'function') {
    window.renderArticleCards();
  }

  // Refresh the current page's title/description in the chosen language
  if (typeof window.__esoApplyMeta === 'function') {
    window.__esoApplyMeta();
  }

  localStorage.setItem('eso_lang', lang);
};

// ============================================================================
//  MoF DECREES, live loading & rendering from the PHP backend
// ============================================================================
window.__esoDecrees = null;

window.loadDecrees = function () {
  if (!DECREES_API) return;                 // not configured → keep static fallback
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  fetch(DECREES_API, { signal: ctrl.signal })
    .then(r => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
    .then(items => {
      clearTimeout(timer);
      if (Array.isArray(items)) {
        window.__esoDecrees = items;
        window.renderDecrees();
      }
    })
    .catch(() => { clearTimeout(timer); /* leave the static fallback in place */ });
};

window.renderDecrees = function () {
  const list = document.getElementById('decrees-list');
  if (!list || !Array.isArray(window.__esoDecrees)) return;

  const lang = document.documentElement.lang || localStorage.getItem('eso_lang') || 'en';
  const dict = translations[lang] || translations.en;
  const openLabel = dict.mof_open_decree || 'Open Decree';
  const pubLabel  = dict.published_label || 'Published:';
  const localeMap = { en: 'en-US', fr: 'fr-FR', ar: 'ar' };
  const emptyMsg  = { en: 'No decrees published yet.', fr: 'Aucun décret publié pour le moment.', ar: 'لا توجد قرارات منشورة بعد.' }[lang] || 'No decrees published yet.';

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const fmtDate = (d) => {
    if (!d) return '';
    const dt = new Date(d + 'T00:00:00');
    if (isNaN(dt.getTime())) return esc(d);
    try { return dt.toLocaleDateString(localeMap[lang] || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return esc(d); }
  };

  const items = window.__esoDecrees;
  if (!items.length) {
    list.innerHTML = `<p style="color: var(--eso-text-muted); padding: 20px 0; margin: 0;">${esc(emptyMsg)}</p>`;
    return;
  }

  list.innerHTML = items.map((it, i) => {
    const border  = i < items.length - 1 ? 'border-bottom: 1px solid #f1f5f9;' : '';
    // Format: "Type #number, description - origin"  (e.g. Decree #3402, VAT extension - M.O. Work)
    const numRaw  = String(it.number || '').replace(/^#\s*/, '');
    const label   = '<strong>' + esc(it.type || 'Decree') + (numRaw ? ' #' + esc(numRaw) : '') + '</strong>';
    const desc    = it.description != null ? esc(it.description) : esc(it.title);
    const orig    = it.origin ? ' <span style="color: var(--eso-text-muted);">- ' + esc(it.origin) + '</span>' : '';
    const heading = label + ', ' + desc + orig;
    const url     = esc(it.url || '');
    return `
      <div class="pdf-item" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 0; ${border}">
        <div style="display: flex; align-items: center; gap: 20px;">
          <span style="font-size: 28px;">📄</span>
          <div>
            <h4 style="margin: 0 0 5px 0; color: var(--eso-navy); font-size: 1.15rem;">${heading}</h4>
            <span style="color: var(--eso-text-muted); font-size: 0.85rem;"><span data-i18n="published_label">${esc(pubLabel)}</span> ${fmtDate(it.date)}</span>
          </div>
        </div>
        <a href="javascript:void(0)" class="btn btn-outline-dark view-pdf-btn" data-pdf-url="${url}" style="padding: 10px 20px; font-size: 0.8rem; border-color: var(--eso-silver-dark);" data-i18n="mof_open_decree">${esc(openLabel)}</a>
      </div>`;
  }).join('');
};

// ============================================================================
//  Homepage hero: animated money background (floating coins & currency)
//  Gentle rising coins and currency symbols in gold and cyan over the navy.
//  Pauses when the hero is off-screen; respects prefers-reduced-motion.
// ============================================================================
(function () {
  function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var SYMS = ['$', '$', '$', '\u20ac', '\u00a3', '\u00a5'];   // money-dominant ($ EUR GBP JPY)
    var GOLD = '212, 175, 55', CYAN = '56, 189, 248';
    var W = 0, H = 0, dpr = 1, parts = [];

    function rnd(a, b) { return a + Math.random() * (b - a); }
    function make(anywhere) {
      return {
        x: rnd(0, W || 1),
        y: anywhere ? rnd(0, H || 1) : (H || 1) + rnd(10, 70),
        r: rnd(9, 22),
        vy: rnd(0.15, 0.5),
        phase: rnd(0, Math.PI * 2),
        drift: rnd(0.004, 0.011),
        amp: rnd(6, 22),
        op: rnd(0.10, 0.34),
        coin: Math.random() < 0.4,
        sym: SYMS[(Math.random() * SYMS.length) | 0],
        col: Math.random() < 0.62 ? GOLD : CYAN
      };
    }
    function size() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = w; H = h;
      var n = Math.max(18, Math.min(60, Math.round(w / 32)));
      parts = [];
      for (var i = 0; i < n; i++) parts.push(make(true));
    }
    size();

    function paint(p) {
      var x = p.x + Math.sin(p.phase) * p.amp;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (p.coin) {
        ctx.beginPath(); ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + p.col + ',' + p.op + ')'; ctx.lineWidth = 1.4; ctx.stroke();
        ctx.fillStyle = 'rgba(' + p.col + ',' + (p.op * 0.85) + ')';
        ctx.font = '600 ' + Math.round(p.r * 1.05) + 'px "Courier New", monospace';
        ctx.fillText('$', x, p.y + 1);
      } else {
        ctx.fillStyle = 'rgba(' + p.col + ',' + p.op + ')';
        ctx.font = '600 ' + Math.round(p.r * 1.7) + 'px "Courier New", monospace';
        ctx.fillText(p.sym, x, p.y);
      }
    }

    if (reduce) {
      for (var i = 0; i < parts.length; i++) paint(parts[i]);
      return;
    }

    var last = 0, interval = 1000 / 30;
    function draw(t) {
      if (!canvas.isConnected) return;
      if (canvas.offsetParent === null || !W) { requestAnimationFrame(draw); return; }
      if (t - last < interval) { requestAnimationFrame(draw); return; }
      last = t;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy; p.phase += p.drift;
        if (p.y < -30) { parts[i] = make(false); continue; }
        paint(p);
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    window.addEventListener('load', size);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHeroCanvas);
  else initHeroCanvas();
})();


// ============================================================================
//  Admin-published insight articles: live loading, card injection & routing
// ============================================================================
window.__esoArticles = null;

window.loadArticles = function () {
  var ctrl = new AbortController();
  var timer = setTimeout(function () { ctrl.abort(); }, 8000);
  fetch('/api/articles', { signal: ctrl.signal })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
    .then(function (items) {
      clearTimeout(timer);
      if (Array.isArray(items)) {
        window.__esoArticles = items;
        if (typeof window.renderArticleCards === 'function') window.renderArticleCards();
        if (typeof window.__esoRerouteArticles === 'function') window.__esoRerouteArticles();
      }
    })
    .catch(function () { clearTimeout(timer); });
};

window.renderArticleCards = function () {
  var grid = document.getElementById('insights-grid');
  if (!grid || !Array.isArray(window.__esoArticles)) return;
  grid.querySelectorAll('.insight-card.admin-card').forEach(function (c) { c.remove(); });
  var lang = document.documentElement.lang || 'en';
  var pick = function (o) { return (o && (o[lang] || o.en)) || ''; };
  var loc = { en: 'en-US', fr: 'fr-FR', ar: 'ar' }[lang] || 'en-US';
  var readLabel = { en: 'Read Full Study \u2192', fr: 'Lire l\'\u00e9tude \u2192', ar: '\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0642\u0627\u0644 \u2190' }[lang] || 'Read Full Study \u2192';
  var frag = document.createDocumentFragment();
  window.__esoArticles.forEach(function (a) {
    var card = document.createElement('div');
    card.className = 'insight-card no-image reveal active admin-card';
    var d = new Date(a.date + 'T00:00:00');
    var dateStr = isNaN(d.getTime()) ? a.date : d.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' });
    var href = '/insights/' + a.slug;
    var content = document.createElement('div');
    content.className = 'insight-content';
    var sp = document.createElement('span'); sp.className = 'date'; sp.textContent = dateStr;
    var h3 = document.createElement('h3'); h3.textContent = pick(a.title);
    var p = document.createElement('p'); p.textContent = pick(a.desc);
    var link = document.createElement('a'); link.className = 'read-more nav-router'; link.setAttribute('href', href); link.textContent = readLabel;
    content.appendChild(sp); content.appendChild(h3); content.appendChild(p); content.appendChild(link);
    card.appendChild(content);
    frag.appendChild(card);
  });
  grid.insertBefore(frag, grid.firstChild);
};


// ============================================================================
//  CMS content overrides (text, images, team) from the admin, applied live
// ============================================================================
window.__esoContent = null;

window.loadContent = function () {
  var ctrl = new AbortController();
  var timer = setTimeout(function () { ctrl.abort(); }, 8000);
  fetch('/api/content', { signal: ctrl.signal })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
    .then(function (c) {
      clearTimeout(timer);
      if (!c || typeof c !== 'object') return;
      window.__esoContent = c;
      // Phase 4: text overrides merged onto the built-in translations
      if (c.text && window.translations) {
        ['en', 'fr', 'ar'].forEach(function (l) {
          if (c.text[l] && window.translations[l]) {
            for (var k in c.text[l]) if (c.text[l][k] != null && c.text[l][k] !== '') window.translations[l][k] = c.text[l][k];
          }
        });
      }
      // Phase 3: leadership (Founder & CEO) card overrides
      if (c.leadership && typeof c.leadership === 'object') {
        var L = c.leadership;
        if (window.translations) {
          ['en', 'fr', 'ar'].forEach(function (l) {
            if (L.role && L.role[l]) window.translations[l].role_founder = L.role[l];
            if (L.bio && L.bio[l]) window.translations[l].desc_founder = L.bio[l];
          });
        }
        if (L.name) { var nmEl = document.getElementById('lead-name'); if (nmEl) nmEl.textContent = L.name; }
        if (L.photo) { c.images = c.images || {}; c.images.ceo_portrait = L.photo; }
      }
      window.applyImageOverrides();       // Phase 5
      window.applyContact();              // Contact details
      window.renderTeam();                // Phase 3
      if (typeof window.setLanguage === 'function') window.setLanguage(document.documentElement.lang || 'en');
    })
    .catch(function () { clearTimeout(timer); });
};

window.applyImageOverrides = function () {
  var c = window.__esoContent;
  if (!c || !c.images) return;
  Object.keys(c.images).forEach(function (key) {
    var url = c.images[key];
    if (!url) return;
    document.querySelectorAll('[data-img-key="' + key + '"]').forEach(function (el) {
      if (el.tagName === 'IMG') { el.src = url; return; }
      var cur = getComputedStyle(el).backgroundImage;
      if (cur && cur.indexOf('url(') !== -1) {
        el.style.backgroundImage = cur.replace(/url\((['"]?)[^)]*\1\)/, "url('" + url + "')");
      } else {
        el.style.backgroundImage = "url('" + url + "')";
      }
    });
  });
};

window.applyContact = function () {
  var c = window.__esoContent;
  if (!c || !c.contact || typeof c.contact !== 'object') return;
  var ct = c.contact;
  var setText = function (id, val) { var el = document.getElementById(id); if (el && val != null && String(val).trim() !== '') el.textContent = val; };
  setText('contact-address', ct.address);
  setText('contact-pobox', ct.poBox);
  var phones = ct.phones;
  if (typeof phones === 'string') phones = phones.split(/[\n,]+/);
  if (Array.isArray(phones)) {
    phones = phones.map(function (p) { return String(p).trim(); }).filter(Boolean);
    var pc = document.getElementById('contact-phones');
    if (pc && phones.length) {
      pc.innerHTML = '';
      phones.forEach(function (p, i) {
        if (i) pc.appendChild(document.createElement('br'));
        var a = document.createElement('a');
        a.href = 'tel:' + p.replace(/[^\d+]/g, '');
        a.textContent = p;
        a.style.cssText = 'color: var(--eso-text-dark); text-decoration: none; display: inline-block; padding: 10px 0; position: relative; z-index: 10000;';
        pc.appendChild(a);
      });
    }
  }
  if (ct.email && String(ct.email).trim()) {
    var email = String(ct.email).trim();
    var em = document.getElementById('contact-email');
    if (em) { em.textContent = email; em.setAttribute('href', 'mailto:' + email); }
    document.querySelectorAll('.contact-form-submit').forEach(function (f) { f.setAttribute('action', 'https://formsubmit.co/' + email); });
  }
};

window.renderTeam = function () {
  var grid = document.getElementById('staff-grid');
  var c = window.__esoContent;
  if (!grid || !c || !Array.isArray(c.team) || !c.team.length) return;
  var team = c.team.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  grid.innerHTML = '';
  team.forEach(function (m) {
    var card = document.createElement('div'); card.className = 'team-card';
    var img = document.createElement('div'); img.className = 'team-img';
    img.setAttribute('role', 'img');
    img.setAttribute('aria-label', (m.name || '') + ', ESO Auditors and Consultants');
    img.style.backgroundImage = "url('" + (m.photo || '') + "')";
    img.style.backgroundPosition = 'center top';
    var info = document.createElement('div'); info.className = 'team-info text-center';
    var h3 = document.createElement('h3'); h3.textContent = m.name || '';
    info.appendChild(h3);
    if (m.title) {
      var pr = document.createElement('p');
      pr.style.cssText = 'color:var(--eso-text-muted);font-size:0.85rem;margin-top:4px;';
      pr.textContent = m.title;
      info.appendChild(pr);
    }
    card.appendChild(img); card.appendChild(info);
    grid.appendChild(card);
  });
};
