// ============================================================================
//  Static-site client script (multi-page build). No SPA routing or client i18n:
//  every page is its own static HTML with text already baked in. This handles
//  only interactivity: hero slideshow, language navigation, mobile nav, reveals.
// ============================================================================

// Language switch = go to the same page in the chosen language (real navigation).
window.switchLanguage = function (lang) {
  if (['en', 'ar', 'fr'].indexOf(lang) === -1) lang = 'en';
  var path = location.pathname.replace(/^\/(ar|fr)(?=\/|$)/, '');
  if (!path) path = '/';
  var target = (lang === 'en') ? path : ('/' + lang + (path === '/' ? '' : path));
  location.href = target || '/';
};

// ---- Homepage hero: rotating photo slideshow (one quote per photo) ----
(function () {
  function initHeroSlideshow() {
    var show = document.querySelector('.hero-slideshow');
    if (!show) return;
    var slides = [].slice.call(show.querySelectorAll('.hero-slide'));
    var quotes = [].slice.call(document.querySelectorAll('.hero-quote'));
    var dots = [].slice.call(document.querySelectorAll('.hero-dot'));
    var prev = document.querySelector('.hero-arrow.prev'), next = document.querySelector('.hero-arrow.next');
    var n = slides.length;
    if (!n) return;
    var i = 0, timer = null, DELAY = 6000;
    function go(idx) {
      i = (idx + n) % n;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      quotes.forEach(function (q, k) { q.classList.toggle('is-active', k === i); });
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() { stop(); if (n > 1) timer = setInterval(function () { go(i + 1); }, DELAY); }
    if (prev) prev.addEventListener('click', function () { go(i - 1); start(); });
    if (next) next.addEventListener('click', function () { go(i + 1); start(); });
    dots.forEach(function (d) { d.addEventListener('click', function () { go(+d.getAttribute('data-i')); start(); }); });
    go(0); start();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHeroSlideshow);
  else initHeroSlideshow();
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
      // The firm's inbox as baked into the contact block (editable in the admin); used by the relay.
      var siteEmail = ((document.getElementById('contact-email') || {}).textContent || '').trim() || 'info@eso-acc.com';
      var SENT = 'Thank you, your message has been sent. We will get back to you shortly.';
      var FAILED = 'Sorry, something went wrong. Please email ' + siteEmail + ' directly.';
      // Relay used when the site's own mail sending is not configured: the browser posts to
      // formsubmit.co (the same service the careers form uses), which only accepts browser origins.
      function relay(to) {
        return fetch('https://formsubmit.co/ajax/' + encodeURIComponent(to), {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ _subject: 'Website inquiry: ' + (data.subject || 'Website inquiry'), _replyto: data.email, _template: 'table', name: data.name, email: data.email, subject: data.subject, message: data.message })
        }).then(function (r) { return r.json(); }).then(function (d) { return !!(d && (d.success === true || d.success === 'true')); });
      }
      fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (res.ok && res.d && res.d.ok) return true;
          var fb = res.d && res.d.fallback;
          return relay((fb && fb.provider === 'formsubmit' && fb.to) ? fb.to : siteEmail);
        }, function () { return relay(siteEmail); })
        .catch(function () { return false; })
        .then(function (sent) { if (sent) { show(SENT, true); form.reset(); } else { show(FAILED, false); } })
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

  // Careers form (formsubmit relay): come back to this same page afterwards instead of a
  // formsubmit page, and show the baked, translated thank-you when we do.
  document.querySelectorAll('form.contact-form-submit').forEach(function (form) {
    var next = document.createElement('input');
    next.type = 'hidden'; next.name = '_next';
    next.value = location.origin + location.pathname + '?sent=1';
    form.appendChild(next);
  });
  if (/[?&]sent=1(&|$)/.test(location.search)) {
    var thanks = document.querySelector('.careers-status');
    if (thanks) { thanks.style.display = 'block'; thanks.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  }
});
