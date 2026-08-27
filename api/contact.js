// POST /api/contact — website contact form. Sends the message through ESO's own
// Microsoft 365 via the Graph API (app-only, client-credentials). No third-party
// relay, same-origin (CSP-clean), delivered internally to info@eso-acc.com.
//
// Required Vercel env vars (see setup notes):
//   MS_TENANT_ID     — ESO Entra (Azure AD) tenant id or the *.onmicrosoft.com domain
//   MS_CLIENT_ID     — the registered app's Application (client) id
//   MS_CLIENT_SECRET — a client secret for that app
//   MS_SENDER        — mailbox the app sends AS (e.g. info@eso-acc.com)
//   MS_RECIPIENT     — where submissions are delivered (optional; defaults to MS_SENDER)
import { readJson, json } from './_lib.js';

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clip = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

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

  if (!process.env.MS_TENANT_ID || !process.env.MS_CLIENT_ID || !process.env.MS_CLIENT_SECRET || !process.env.MS_SENDER) {
    json(res, 500, { error: 'not_configured', message: 'Email sending is not configured yet.' });
    return;
  }
  const sender = process.env.MS_SENDER;
  const recipient = process.env.MS_RECIPIENT || sender;

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
      toRecipients: [{ emailAddress: { address: recipient } }],
      replyTo: [{ emailAddress: { address: email, name } }],
    },
    saveToSentItems: true,
  };

  try {
    const token = await graphToken();
    const r = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(mail),
    });
    if (r.status === 202) { json(res, 200, { ok: true }); return; }
    const errText = await r.text().catch(() => '');
    json(res, 502, { error: 'send_failed', message: `Graph ${r.status}: ${errText.slice(0, 300)}` });
  } catch (e) {
    json(res, 502, { error: 'send_failed', message: String((e && e.message) || e) });
  }
}
