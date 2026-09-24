// POST /api/contact — website contact form.
//
// Delivery, in order of preference:
//   1. ESO's own Microsoft 365 via the Graph API (app-only, client-credentials),
//      used when the MS_* env vars below are set. Same-origin, no third party.
//   2. Fallback: the formsubmit.co relay to the firm's mailbox, so submissions are
//      delivered even before the Microsoft app registration exists. formsubmit
//      requires a one-time activation click in the recipient mailbox.
//
// Recipient precedence: CONTACT_TO -> MS_RECIPIENT -> MS_SENDER -> info@eso-acc.com
//
// Optional Vercel env vars for the Microsoft path:
//   MS_TENANT_ID     — ESO Entra (Azure AD) tenant id or the *.onmicrosoft.com domain
//   MS_CLIENT_ID     — the registered app's Application (client) id
//   MS_CLIENT_SECRET — a client secret for that app
//   MS_SENDER        — mailbox the app sends AS (e.g. info@eso-acc.com)
//   MS_RECIPIENT     — where submissions are delivered (defaults to MS_SENDER)
import { readJson, json } from './_lib.js';

const DEFAULT_TO = 'info@eso-acc.com';
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clip = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const recipient = () => process.env.CONTACT_TO || process.env.MS_RECIPIENT || process.env.MS_SENDER || DEFAULT_TO;
const graphConfigured = () => !!(process.env.MS_TENANT_ID && process.env.MS_CLIENT_ID && process.env.MS_CLIENT_SECRET && process.env.MS_SENDER);

async function graphToken() {
  const tenant = process.env.MS_TENANT_ID;
  const body = new URLSearchParams({
    client_id: process.env.MS_CLIENT_ID || '',
    client_secret: process.env.MS_CLIENT_SECRET || '',
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });
  const r = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenant)}/oauth2/v2.0/token`, {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.access_token) throw new Error('token_failed: ' + (d.error_description || d.error || r.status));
  return d.access_token;
}

async function sendViaGraph({ name, email, subject, message }) {
  const sender = process.env.MS_SENDER;
  const html =
    `<p><strong>New website inquiry</strong></p>` +
    `<p><strong>Name:</strong> ${esc(name)}<br>` +
    `<strong>Email:</strong> ${esc(email)}<br>` +
    `<strong>Subject:</strong> ${esc(subject)}</p>` +
    `<p style="white-space:pre-wrap">${esc(message)}</p>` +
    `<hr><p style="color:#64748b;font-size:12px">Sent from the eso-acc.com contact form.</p>`;
  const mail = {
    message: {
      subject: `Website inquiry: ${subject}`.slice(0, 240),
      body: { contentType: 'HTML', content: html },
      toRecipients: [{ emailAddress: { address: recipient() } }],
      replyTo: [{ emailAddress: { address: email, name } }],
    },
    saveToSentItems: true,
  };
  const token = await graphToken();
  const r = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(mail),
  });
  if (r.status !== 202) throw new Error(`Graph ${r.status}: ${(await r.text().catch(() => '')).slice(0, 300)}`);
}

// formsubmit only accepts AJAX submissions that come from a web page, so we forward the
// origin of the page that submitted the form (falling back to the firm's own domain).
async function sendViaFormsubmit({ name, email, subject, message }, origin) {
  const site = origin || 'https://eso-acc.com';
  const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient())}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Origin: site, Referer: site + '/contact' },
    body: JSON.stringify({
      _subject: `Website inquiry: ${subject}`.slice(0, 240),
      _replyto: email,
      _template: 'table',
      name, email, subject, message,
    }),
  });
  const d = await r.json().catch(() => ({}));
  if (r.ok && (d.success === true || d.success === 'true')) return;
  const msg = String((d && d.message) || `HTTP ${r.status}`);
  const err = new Error(msg);
  err.pending = /activat/i.test(msg); // mailbox has not clicked formsubmit's activation link yet
  throw err;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { json(res, 405, { error: 'method_not_allowed' }); return; }

  const b = await readJson(req);
  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (clip(b.company, 200) || clip(b.website, 200)) { json(res, 200, { ok: true }); return; }

  const name = clip(b.name, 200);
  const email = clip(b.email, 200);
  const subject = clip(b.subject, 200) || 'Website inquiry';
  const message = clip(b.message, 8000);
  if (!name || !email || !message) { json(res, 400, { error: 'missing_fields' }); return; }
  if (!emailOk(email)) { json(res, 400, { error: 'bad_email' }); return; }

  const payload = { name, email, subject, message };
  // Origin of the page that submitted the form (browsers send it on cross-page POSTs).
  const hdr = (k) => String((req.headers && req.headers[k]) || '');
  const origin = /^https?:\/\/[^/\s]+$/.test(hdr('origin')) ? hdr('origin') : ((hdr('referer').match(/^https?:\/\/[^/\s]+/) || [''])[0] || '');
  let graphError = null;
  if (graphConfigured()) {
    try { await sendViaGraph(payload); json(res, 200, { ok: true, via: 'graph' }); return; }
    catch (e) { graphError = String((e && e.message) || e).slice(0, 200); }
  }
  try {
    await sendViaFormsubmit(payload, origin);
    json(res, 200, { ok: true, via: 'formsubmit' });
  } catch (e) {
    json(res, 502, {
      error: e.pending ? 'activation_pending' : 'send_failed',
      message: String((e && e.message) || e).slice(0, 300),
      ...(graphError ? { graph: graphError } : {}),
    });
  }
}
