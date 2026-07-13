<?php
/**
 * ESO Decrees Backend — Configuration
 * ------------------------------------
 * Edit the values below, then save. This file runs on the server only and is
 * never sent to browsers, so the password here is not publicly visible — but
 * still use a strong passphrase and keep this folder out of any public git repo.
 */

return [

  // 1) ADMIN PASSWORD — used to log in to the secret admin page (admin.php).
  //    CHANGE THIS to a long, private passphrase before going live.
  'admin_password' => 'CHANGE-ME-to-a-long-private-passphrase',

  // 2) ALLOWED ORIGINS — the website address(es) that are allowed to read the
  //    public decrees list. Add every domain your site is served from.
  'allowed_origins' => [
    'https://eso-website.vercel.app',
    'https://eso-acc.com',
    'https://www.eso-acc.com',
  ],

  // 3) PUBLIC API KEY — optional. Leave '' so the published decrees list is
  //    public (recommended — these are meant to be read by visitors).
  //    If set, the frontend must call decrees.php?key=THISVALUE.
  'public_api_key' => '',

  // 4) MAX PDF SIZE in megabytes.
  'max_pdf_mb' => 25,

];
