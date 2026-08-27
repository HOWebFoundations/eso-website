// ============================================================================
//  Static-site client script (multi-page build). No SPA routing or client i18n:
//  every page is its own static HTML with text already baked in. This handles
//  only interactivity: money animation, language navigation, mobile nav, reveals.
// ============================================================================

// Language switch = go to the same page in the chosen language (real navigation).
window.switchLanguage = function (lang) {
  if (['en', 'ar', 'fr'].indexOf(lang) === -1) lang = 'en';
  var path = location.pathname.replace(/^\/(ar|fr)(?=\/|$)/, '');
  if (!path) path = '/';
  var target = (lang === 'en') ? path : ('/' + lang + (path === '/' ? '' : path));
  location.href = target || '/';
};

// ---- Homepage hero: animated money background ----
(function () {
  function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var SYMS = ['$', '$', '$', '€', '£', '¥'];
    var GOLD = '212, 175, 55', CYAN = '56, 189, 248';
    var W = 0, H = 0, dpr = 1, parts = [];
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function make(anywhere) {
      return {
        x: rnd(0, W || 1), y: anywhere ? rnd(0, H || 1) : (H || 1) + rnd(10, 70),
        r: rnd(9, 22), vy: rnd(0.15, 0.5), phase: rnd(0, Math.PI * 2), drift: rnd(0.004, 0.011),
        amp: rnd(6, 22), op: rnd(0.10, 0.34), coin: Math.random() < 0.4,
        sym: SYMS[(Math.random() * SYMS.length) | 0], col: Math.random() < 0.62 ? GOLD : CYAN
      };
    }
    function size() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); W = w; H = h;
      var inten = (window.__esoAnim && +window.__esoAnim.intensity) || 1;
      inten = Math.max(0.2, Math.min(2.5, inten));
      var n = Math.max(4, Math.min(120, Math.round(w / 32 * inten)));
      parts = [];
      for (var i = 0; i < n; i++) parts.push(make(true));
    }
    size();
    window.__heroApply = function () {
      var cfg = window.__esoAnim || {};
      canvas.style.display = (cfg.enabled === false) ? 'none' : '';
      if (cfg.enabled !== false) size();
    };
    window.__heroApply();
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
    if (reduce) { for (var i = 0; i < parts.length; i++) paint(parts[i]); return; }
    var last = 0, interval = 1000 / 30;
    function draw(t) {
      if (!canvas.isConnected) return;
      if (canvas.offsetParent === null || !W) { requestAnimationFrame(draw); return; }
      if (t - last < interval) { requestAnimationFrame(draw); return; }
      last = t; ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i]; p.y -= p.vy; p.phase += p.drift;
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

// ---- Page interactivity ----
document.addEventListener('DOMContentLoaded', function () {
  // Reveal-on-scroll
  function triggerReveals() {
    var reveals = document.querySelectorAll('.reveal');
    var wh = window.innerHeight;
    reveals.forEach(function (r) {
      if (r.getBoundingClientRect().top < wh - 50) r.classList.add('active');
    });
  }
  triggerReveals();
  window.addEventListener('scroll', triggerReveals);
  window.addEventListener('load', triggerReveals);

  // Mobile hamburger
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger) hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    if (navLinks) navLinks.classList.toggle('active');
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
    var btn = dd.querySelector('.nav-dropbtn');
    if (btn) btn.addEventListener('click', function (e) {
      if (window.innerWidth <= 1024) { e.stopPropagation(); dd.classList.toggle('active'); }
    });
  });

  // Close mobile menu on simple link click
  document.querySelectorAll('.nav-links > li > a:not(.nav-dropbtn)').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 1024) {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });

  // Contact form → POST /api/contact (sends via ESO's Microsoft 365)
  document.querySelectorAll('.js-contact-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var btn = form.querySelector('button[type=submit]');
      var val = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value : ''; };
      function show(msg, ok) {
        if (!status) return;
        status.textContent = msg; status.style.display = 'block';
        status.style.background = ok ? '#ecfdf5' : '#fef2f2';
        status.style.color = ok ? '#065f46' : '#991b1b';
        status.style.border = '1px solid ' + (ok ? '#a7f3d0' : '#fecaca');
      }
      var data = { name: val('Name'), email: val('Email'), subject: val('Subject'), message: val('Message'), company: val('company') };
      if (!data.name || !data.email || !data.message) { show('Please fill in your name, email and message.', false); return; }
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (res.ok && res.d && res.d.ok) { show('Thank you — your message has been sent. We will get back to you shortly.', true); form.reset(); }
          else { show('Sorry, something went wrong. Please email info@eso-acc.com directly.', false); }
        })
        .catch(function () { show('Sorry, something went wrong. Please email info@eso-acc.com directly.', false); })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
    });
  });

  // Careers "Apply" buttons: preselect role + scroll to form
  var positionSelect = document.getElementById('position');
  document.querySelectorAll('.apply-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var role = btn.getAttribute('data-role');
      if (positionSelect && role) positionSelect.value = role;
      var form = document.getElementById('apply-form');
      if (form) form.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
