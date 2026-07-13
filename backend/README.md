# ESO Decrees Backend (PHP)

A tiny, self-contained PHP backend that lets you **upload decree PDFs and set their
titles/numbers/dates from a private admin page** — the website updates itself, with
no code changes per decree.

It has **no database** and **no dependencies** — just PHP 7.4+ (works on any normal
cPanel / Plesk / LiteSpeed / Apache shared hosting).

```
backend/
├── admin.php        ← the SECRET admin page (login + upload + manage)
├── decrees.php      ← public JSON the website reads
├── config.php       ← YOU edit this (password + allowed site domains)
├── lib.php          ← shared code (don't need to touch)
├── data/            ← decrees.json lives here (blocked from the web)
└── uploads/         ← the PDFs live here (public to read, never executed)
```

> ⚠️ This backend **cannot run on Vercel** (Vercel has no PHP and a read-only disk).
> Host it on your normal web hosting — e.g. the cPanel that comes with `eso-acc.com`.

---

## Setup (about 5 minutes)

### 1. Upload the folder
Copy the whole `backend/` folder to your hosting's public web root
(`public_html/`). Rename it to something short, e.g. `decrees` →
`public_html/decrees/`.

### 2. Set your password and site domains
Open `config.php` and change:
- `admin_password` → a long private passphrase (this guards the admin page).
- `allowed_origins` → the exact address(es) your website is served from
  (already includes `https://eso-website.vercel.app`; add your real domain when live).

### 3. Make the folders writable
In your file manager set permissions so PHP can write:
- `uploads/` → `755` (or `775` if uploads fail)
- `data/`    → `755` (or `775`)

Most hosts already allow this by default — only change it if uploads/deletes fail.

### 4. (Recommended) Make the admin URL secret
Rename `admin.php` to something no one can guess, e.g. `manage-9f3k2x.php`.
That renamed page is your private control panel. The password still protects it
regardless, so this is just an extra layer.

### 5. Log in and add decrees
Visit `https://YOURDOMAIN/decrees/admin.php` (or your renamed file), log in,
and upload PDFs with a title, optional decree number, and date. They appear on
the website immediately.

### 6. Connect the website
The admin page shows your **public list URL**, e.g.
`https://YOURDOMAIN/decrees/decrees.php`.
Put that value into the website's `script.js` at the top:

```js
const DECREES_API = "https://YOURDOMAIN/decrees/decrees.php";
```

Then redeploy the site (or send the URL to your developer / Claude and it'll be
wired up and redeployed for you).

---

## How it stays safe
- Admin page is **password protected** (constant-time check, brute-force delay,
  secure session cookie) and can live at a **secret filename**.
- Uploads are validated as **real PDFs** (extension + MIME + `%PDF` signature),
  size-limited, and stored under **random filenames**.
- The `uploads/` folder is configured to **never execute code**.
- The `data/` folder is **blocked from the web**.
- The public API is **read-only** and only serves the fields the site needs.

## Troubleshooting
- **"larger than the limit"** → raise `max_pdf_mb` in `config.php` and the upload
  limits in cPanel → *Select PHP Version / Options* (`upload_max_filesize`,
  `post_max_size`).
- **Uploads/deletes fail** → set `uploads/` and `data/` to `775`.
- **Website still shows the old list** → confirm `DECREES_API` is set to your
  `decrees.php` URL and that your domain is in `allowed_origins`.
