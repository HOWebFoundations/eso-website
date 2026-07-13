<?php
/**
 * ESO Decrees Backend — shared helpers (data store, CORS, auth, CSRF).
 * No output should ever be produced by including this file.
 */

function cfg() {
  static $c = null;
  if ($c === null) {
    $c = require __DIR__ . '/config.php';
  }
  return $c;
}

function data_file()  { return __DIR__ . '/data/decrees.json'; }
function upload_dir() { return __DIR__ . '/uploads'; }

/* ---------- Data store ---------- */

function load_decrees() {
  $f = data_file();
  if (!is_file($f)) return [];
  $raw = file_get_contents($f);
  if ($raw === false || $raw === '') return [];
  $d = json_decode($raw, true);
  return is_array($d) ? $d : [];
}

function save_decrees($arr) {
  $f = data_file();
  $dir = dirname($f);
  if (!is_dir($dir)) @mkdir($dir, 0755, true);
  $json = json_encode(array_values($arr), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  $tmp = $f . '.' . bin2hex(random_bytes(4)) . '.tmp';
  if (file_put_contents($tmp, $json, LOCK_EX) === false) return false;
  return rename($tmp, $f);
}

/* ---------- URLs ---------- */

function base_url() {
  $https  = (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off')
            || (($_SERVER['SERVER_PORT'] ?? '') == 443)
            || (strtolower($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
  $scheme = $https ? 'https' : 'http';
  $host   = $_SERVER['HTTP_HOST'] ?? 'localhost';
  $dir    = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');
  return $scheme . '://' . $host . $dir;
}

function pdf_url($file) {
  return base_url() . '/uploads/' . rawurlencode($file);
}

/* ---------- CORS (for the public API) ---------- */

function send_cors() {
  $c = cfg();
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
  if ($origin !== '' && in_array($origin, $c['allowed_origins'], true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
  }
  if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
  }
}

/* ---------- Admin session / auth ---------- */

function admin_start() {
  if (session_status() === PHP_SESSION_ACTIVE) return;
  $secure = (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off')
            || (strtolower($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
  session_name('eso_admin');
  session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'secure'   => $secure,
    'samesite' => 'Lax',
  ]);
  session_start();
}

function is_admin() { return !empty($_SESSION['eso_admin_ok']); }

function admin_login($password) {
  $c = cfg();
  $ok = is_string($c['admin_password'])
        && $c['admin_password'] !== ''
        && hash_equals($c['admin_password'], (string) $password);
  if ($ok) {
    session_regenerate_id(true);
    $_SESSION['eso_admin_ok'] = true;
  }
  return $ok;
}

function admin_logout() {
  $_SESSION = [];
  if (ini_get('session.use_cookies')) {
    $p = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
  }
  session_destroy();
}

/* ---------- CSRF ---------- */

function csrf_token() {
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
  return $_SESSION['csrf'];
}

function check_csrf($t) {
  return !empty($_SESSION['csrf']) && is_string($t) && hash_equals($_SESSION['csrf'], $t);
}

/* ---------- Misc ---------- */

function h($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }

function new_id() { return bin2hex(random_bytes(6)); }
