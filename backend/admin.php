<?php
/**
 * ESO Decrees Backend — SECRET ADMIN PAGE
 * ----------------------------------------
 * Log in here to upload decree PDFs and manage titles/numbers/dates.
 * For extra secrecy you may RENAME this file to something unguessable,
 * e.g. manage-9f3k2x.php — the login password still protects it either way.
 */

require __DIR__ . '/lib.php';
admin_start();

$c       = cfg();
$notice  = '';
$error   = '';
$method  = $_SERVER['REQUEST_METHOD'] ?? 'GET';

/* ---------------- Handle actions ---------------- */

if ($method === 'POST') {
  $action = $_POST['action'] ?? '';

  // --- Login ---
  if ($action === 'login') {
    if (admin_login($_POST['password'] ?? '')) {
      header('Location: ' . basename(__FILE__));
      exit;
    } else {
      usleep(800000); // slow down brute force
      $error = 'Incorrect password.';
    }
  }

  // --- Logout ---
  elseif ($action === 'logout') {
    admin_logout();
    header('Location: ' . basename(__FILE__));
    exit;
  }

  // --- Everything below requires an authenticated admin + valid CSRF ---
  elseif (is_admin()) {

    if (!check_csrf($_POST['csrf'] ?? '')) {
      $error = 'Session expired, please try again.';
    }

    // Add a decree (upload PDF + metadata)
    elseif ($action === 'add') {
      $title = trim((string) ($_POST['title'] ?? ''));
      $karar = trim((string) ($_POST['karar'] ?? ''));
      $date  = trim((string) ($_POST['date']  ?? ''));

      if ($title === '') {
        $error = 'Please enter a title for the decree.';
      } elseif (!isset($_FILES['pdf']) || ($_FILES['pdf']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        $error = 'Please choose a PDF file to upload.' . upload_error_hint($_FILES['pdf']['error'] ?? UPLOAD_ERR_NO_FILE);
      } else {
        $f      = $_FILES['pdf'];
        $maxB   = (int) $c['max_pdf_mb'] * 1024 * 1024;
        $ext    = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
        $okMime = false;

        if (function_exists('finfo_open')) {
          $fi   = finfo_open(FILEINFO_MIME_TYPE);
          $mime = finfo_file($fi, $f['tmp_name']);
          finfo_close($fi);
          $okMime = ($mime === 'application/pdf');
        } else {
          $okMime = true; // finfo unavailable; fall back to magic-byte check below
        }

        $magic = @file_get_contents($f['tmp_name'], false, null, 0, 5);

        if ($f['size'] > $maxB) {
          $error = 'That PDF is larger than the ' . (int) $c['max_pdf_mb'] . ' MB limit.';
        } elseif ($ext !== 'pdf' || !$okMime || strpos((string) $magic, '%PDF') !== 0) {
          $error = 'Only real PDF files are allowed.';
        } else {
          if (!is_dir(upload_dir())) @mkdir(upload_dir(), 0755, true);
          $stored = new_id() . '-' . bin2hex(random_bytes(4)) . '.pdf';
          $dest   = upload_dir() . '/' . $stored;

          if (!move_uploaded_file($f['tmp_name'], $dest)) {
            $error = 'Could not save the uploaded file. Check that the /uploads folder is writable.';
          } else {
            @chmod($dest, 0644);
            $items = load_decrees();
            $items[] = [
              'id'       => new_id(),
              'karar'    => mb_substr($karar, 0, 60),
              'title'    => mb_substr($title, 0, 200),
              'date'     => normalize_date($date),
              'file'     => $stored,
              'original' => mb_substr(preg_replace('/[^\x20-\x7E]/', '', $f['name']), 0, 120),
              'uploaded' => gmdate('c'),
            ];
            if (save_decrees($items)) {
              $notice = 'Decree added and published.';
            } else {
              @unlink($dest);
              $error = 'Could not write the data file. Check that the /data folder is writable.';
            }
          }
        }
      }
    }

    // Delete a decree
    elseif ($action === 'delete') {
      $id = (string) ($_POST['id'] ?? '');
      $items = load_decrees();
      $kept  = [];
      $removedFile = null;
      foreach ($items as $it) {
        if (($it['id'] ?? '') === $id) { $removedFile = $it['file'] ?? null; continue; }
        $kept[] = $it;
      }
      if ($removedFile !== null) {
        $path = upload_dir() . '/' . basename($removedFile);
        if (is_file($path)) @unlink($path);
        save_decrees($kept);
        $notice = 'Decree removed.';
      } else {
        $error = 'Decree not found.';
      }
    }
  }
}

function upload_error_hint($code) {
  switch ($code) {
    case UPLOAD_ERR_INI_SIZE:
    case UPLOAD_ERR_FORM_SIZE:  return ' (The file exceeds the server upload limit — see README to raise it.)';
    case UPLOAD_ERR_PARTIAL:    return ' (The upload was interrupted, try again.)';
    case UPLOAD_ERR_NO_TMP_DIR: return ' (Server has no temp folder configured.)';
    case UPLOAD_ERR_CANT_WRITE: return ' (Server could not write the temp file.)';
    default: return '';
  }
}

function normalize_date($d) {
  $d = trim($d);
  if ($d === '') return gmdate('Y-m-d');
  $ts = strtotime($d);
  return $ts ? date('Y-m-d', $ts) : gmdate('Y-m-d');
}

function fmt_date($d) {
  $ts = strtotime((string) $d);
  return $ts ? date('F j, Y', $ts) : h($d);
}

$loggedIn = is_admin();
$decrees  = $loggedIn ? load_decrees() : [];
usort($decrees, function ($a, $b) { return strcmp($b['date'] ?? '', $a['date'] ?? ''); });
$apiUrl   = base_url() . '/decrees.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>ESO Decrees — Admin</title>
<style>
  :root { --navy:#15182b; --navy2:#1e293b; --accent:#38bdf8; --muted:#64748b; --line:#e2e8f0; --bg:#f8fafc; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:-apple-system,Segoe UI,Roboto,Inter,sans-serif; background:var(--bg); color:#334155; line-height:1.5; }
  .topbar { background:var(--navy); color:#fff; padding:18px 24px; display:flex; justify-content:space-between; align-items:center; }
  .topbar h1 { font-size:1.15rem; font-weight:600; letter-spacing:.3px; }
  .topbar .badge { background:rgba(56,189,248,.15); color:var(--accent); border:1px solid rgba(56,189,248,.4); font-size:.7rem; padding:4px 10px; border-radius:20px; text-transform:uppercase; letter-spacing:1px; }
  .wrap { max-width:820px; margin:32px auto; padding:0 20px; }
  .card { background:#fff; border:1px solid var(--line); border-radius:10px; padding:28px; margin-bottom:24px; box-shadow:0 6px 20px rgba(0,0,0,.04); }
  .card h2 { color:var(--navy); font-size:1.2rem; margin-bottom:18px; }
  label { display:block; font-size:.82rem; font-weight:600; color:var(--navy); margin:14px 0 6px; }
  input[type=text], input[type=date], input[type=password] { width:100%; padding:12px 14px; border:1px solid var(--line); border-radius:6px; font-size:.95rem; font-family:inherit; }
  input[type=file] { width:100%; padding:12px; border:1px dashed var(--line); border-radius:6px; background:#fbfdff; }
  input:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px rgba(56,189,248,.15); }
  .row { display:flex; gap:16px; flex-wrap:wrap; }
  .row > div { flex:1; min-width:160px; }
  .btn { display:inline-block; border:none; cursor:pointer; font-family:inherit; font-size:.85rem; font-weight:600; letter-spacing:.5px; text-transform:uppercase; padding:13px 26px; border-radius:6px; transition:.2s; }
  .btn-primary { background:var(--accent); color:var(--navy); }
  .btn-primary:hover { filter:brightness(1.08); }
  .btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.4); padding:8px 16px; }
  .btn-danger { background:#fff; color:#dc2626; border:1px solid #fecaca; padding:8px 14px; font-size:.72rem; }
  .btn-danger:hover { background:#dc2626; color:#fff; }
  .msg { padding:13px 16px; border-radius:6px; margin-bottom:20px; font-size:.9rem; }
  .msg.ok { background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; }
  .msg.err { background:#fef2f2; color:#991b1b; border:1px solid #fecaca; }
  table { width:100%; border-collapse:collapse; margin-top:8px; }
  th, td { text-align:left; padding:12px 10px; border-bottom:1px solid var(--line); font-size:.9rem; vertical-align:top; }
  th { font-size:.72rem; text-transform:uppercase; letter-spacing:1px; color:var(--muted); }
  td .k { font-weight:600; color:var(--navy); }
  td .d { color:var(--muted); font-size:.8rem; }
  td a.file { color:var(--accent); font-size:.8rem; text-decoration:none; }
  .empty { color:var(--muted); text-align:center; padding:30px 0; }
  .api { font-size:.8rem; color:var(--muted); word-break:break-all; background:var(--bg); border:1px solid var(--line); border-radius:6px; padding:10px 12px; margin-top:6px; }
  .login-wrap { max-width:400px; margin:9vh auto; }
  .hint { font-size:.78rem; color:var(--muted); margin-top:6px; }
</style>
</head>
<body>

<?php if (!$loggedIn): ?>
  <div class="login-wrap">
    <div class="card">
      <h2>ESO Decrees — Admin Login</h2>
      <?php if ($error): ?><div class="msg err"><?= h($error) ?></div><?php endif; ?>
      <form method="POST" autocomplete="off">
        <input type="hidden" name="action" value="login">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" autofocus required>
        <div style="margin-top:20px;"><button class="btn btn-primary" type="submit" style="width:100%;">Log In</button></div>
      </form>
      <p class="hint">This page manages the Ministry of Finance decrees shown on the website.</p>
    </div>
  </div>

<?php else: ?>
  <div class="topbar">
    <h1>ESO Decrees <span class="badge">Admin</span></h1>
    <form method="POST"><input type="hidden" name="action" value="logout"><button class="btn btn-ghost" type="submit">Log out</button></form>
  </div>

  <div class="wrap">
    <?php if ($notice): ?><div class="msg ok"><?= h($notice) ?></div><?php endif; ?>
    <?php if ($error):  ?><div class="msg err"><?= h($error) ?></div><?php endif; ?>

    <div class="card">
      <h2>Add a decree</h2>
      <form method="POST" enctype="multipart/form-data">
        <input type="hidden" name="action" value="add">
        <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
        <label for="title">Title *</label>
        <input type="text" id="title" name="title" placeholder="e.g. VAT Deadline Extension" required>
        <div class="row">
          <div>
            <label for="karar">Decree number (optional)</label>
            <input type="text" id="karar" name="karar" placeholder="e.g. Karar No. 456/1">
          </div>
          <div>
            <label for="date">Publication date</label>
            <input type="date" id="date" name="date" value="<?= h(date('Y-m-d')) ?>">
          </div>
        </div>
        <label for="pdf">PDF file * (max <?= (int) $c['max_pdf_mb'] ?> MB)</label>
        <input type="file" id="pdf" name="pdf" accept="application/pdf,.pdf" required>
        <div style="margin-top:22px;"><button class="btn btn-primary" type="submit">Upload &amp; Publish</button></div>
      </form>
    </div>

    <div class="card">
      <h2>Published decrees (<?= count($decrees) ?>)</h2>
      <?php if (!$decrees): ?>
        <div class="empty">No decrees yet. Add your first one above.</div>
      <?php else: ?>
        <table>
          <thead><tr><th>Decree</th><th>Date</th><th>PDF</th><th></th></tr></thead>
          <tbody>
          <?php foreach ($decrees as $it): ?>
            <tr>
              <td>
                <div class="k"><?= h($it['title'] ?? '') ?></div>
                <?php if (!empty($it['karar'])): ?><div class="d"><?= h($it['karar']) ?></div><?php endif; ?>
              </td>
              <td class="d"><?= h(fmt_date($it['date'] ?? '')) ?></td>
              <td><a class="file" href="uploads/<?= h(rawurlencode($it['file'] ?? '')) ?>" target="_blank" rel="noopener">view&nbsp;↗</a></td>
              <td style="text-align:right;">
                <form method="POST" onsubmit="return confirm('Delete this decree and its PDF?');">
                  <input type="hidden" name="action" value="delete">
                  <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
                  <input type="hidden" name="id" value="<?= h($it['id'] ?? '') ?>">
                  <button class="btn btn-danger" type="submit">Delete</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>

    <div class="card">
      <h2>Website connection</h2>
      <p style="font-size:.9rem;">Public list URL (put this in the website's <code>DECREES_API</code> setting):</p>
      <div class="api"><?= h($apiUrl) ?></div>
    </div>
  </div>
<?php endif; ?>

</body>
</html>
