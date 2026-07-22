// POST /api/upload-image, multipart image upload. Auth required. Stores in Supabase assets/.
import Busboy from 'busboy';
import crypto from 'node:crypto';
import { isAuthed, json } from './_lib.js';
import { uploadObject, publicUrl } from './_storage.js';

export const config = { api: { bodyParser: false } };
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

export default async function handler(req, res) {
  if (req.method !== 'POST') { json(res, 405, { error: 'method_not_allowed' }); return; }
  if (!isAuthed(req)) { json(res, 401, { error: 'unauthorized' }); return; }

  let fileBuf = null, mime = '', tooBig = false, gotFile = false;
  try {
    await new Promise((resolve, reject) => {
      const bb = Busboy({ headers: req.headers, limits: { files: 1, fileSize: MAX_BYTES } });
      bb.on('file', (_name, stream, info) => {
        gotFile = true; mime = (info && info.mimeType) || '';
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
  } catch (e) { json(res, 400, { error: 'parse_failed', message: String((e && e.message) || e) }); return; }

  if (tooBig) { json(res, 413, { error: 'too_large', message: `Image exceeds ${MAX_BYTES / 1048576} MB` }); return; }
  if (!gotFile || !fileBuf || !fileBuf.length) { json(res, 400, { error: 'no_file' }); return; }

  let ext = EXT[mime];
  if (!ext) { // sniff signature
    if (fileBuf[0] === 0xFF && fileBuf[1] === 0xD8) ext = 'jpg';
    else if (fileBuf.slice(1, 4).toString('latin1') === 'PNG') ext = 'png';
    else if (fileBuf.slice(0, 4).toString('latin1') === 'RIFF' && fileBuf.slice(8, 12).toString('latin1') === 'WEBP') ext = 'webp';
  }
  if (!ext) { json(res, 415, { error: 'not_image' }); return; }

  try {
    const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    const path = `assets/${id}.${ext}`;
    await uploadObject(path, fileBuf, mime || ('image/' + (ext === 'jpg' ? 'jpeg' : ext)));
    json(res, 200, { ok: true, url: publicUrl(path) });
  } catch (e) {
    json(res, 500, { error: 'store_failed', message: String((e && e.message) || e) });
  }
}
