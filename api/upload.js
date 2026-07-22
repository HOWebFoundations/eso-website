// POST /api/upload, multipart: pdf (file) + title, karar, date. Auth required.
// Stores the PDF and its metadata in Supabase Storage.
import Busboy from 'busboy';
import crypto from 'node:crypto';
import { isAuthed, json } from './_lib.js';
import { uploadObject, publicUrl } from './_storage.js';

export const config = { api: { bodyParser: false } };

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

export default async function handler(req, res) {
  if (req.method !== 'POST') { json(res, 405, { error: 'method_not_allowed' }); return; }
  if (!isAuthed(req)) { json(res, 401, { error: 'unauthorized' }); return; }

  const fields = {};
  let fileBuf = null;
  let tooBig = false;
  let gotFile = false;

  try {
    await new Promise((resolve, reject) => {
      const bb = Busboy({ headers: req.headers, limits: { files: 1, fileSize: MAX_BYTES } });
      bb.on('field', (name, val) => { fields[name] = val; });
      bb.on('file', (_name, stream) => {
        gotFile = true;
        const chunks = [];
        stream.on('data', d => chunks.push(d));
        stream.on('limit', () => { tooBig = true; stream.resume(); });
        stream.on('end', () => { if (!tooBig) fileBuf = Buffer.concat(chunks); });
      });
      bb.on('close', resolve);
      bb.on('error', reject);

      if (Buffer.isBuffer(req.body)) bb.end(req.body);
      else if (typeof req.body === 'string') bb.end(Buffer.from(req.body));
      else req.pipe(bb);
    });
  } catch (e) {
    json(res, 400, { error: 'parse_failed', message: String((e && e.message) || e) });
    return;
  }

  if (tooBig) { json(res, 413, { error: 'too_large', message: `PDF exceeds ${MAX_BYTES / 1048576} MB` }); return; }
  if (!gotFile || !fileBuf || !fileBuf.length) { json(res, 400, { error: 'no_file' }); return; }

  // 4 fields: number, type (Law/Decree/Decision), origin, description (+ date, pdf)
  const description = String(fields.description || fields.title || '').trim().slice(0, 400);
  const number = String(fields.number || fields.karar || '').trim().slice(0, 60);
  const origin = String(fields.origin || '').trim().slice(0, 120);
  const ALLOWED = ['Law', 'Decree', 'Decision'];
  let type = String(fields.type || 'Decree').trim();
  if (!ALLOWED.includes(type)) type = 'Decree';
  let date = String(fields.date || '').trim();
  if (!description) { json(res, 400, { error: 'no_description' }); return; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) date = new Date().toISOString().slice(0, 10);

  // Must be a real PDF.
  if (!fileBuf.slice(0, 5).toString('latin1').startsWith('%PDF')) {
    json(res, 415, { error: 'not_pdf' });
    return;
  }

  try {
    const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    const pdfPath = `pdf/${id}.pdf`;
    await uploadObject(pdfPath, fileBuf, 'application/pdf');
    const url = publicUrl(pdfPath);
    const meta = { id, number, type, origin, description, date, url, uploaded: new Date().toISOString() };
    await uploadObject(`meta/${id}.json`, Buffer.from(JSON.stringify(meta)), 'application/json');
    json(res, 200, { ok: true, decree: { id, number, type, origin, description, date, url } });
  } catch (e) {
    json(res, 500, { error: 'store_failed', message: String((e && e.message) || e) });
  }
}
