<?php
/**
 * ESO Decrees Backend — public read-only API.
 * Returns the list of published decrees as JSON for the website to render.
 * URL:  https://YOURDOMAIN/<folder>/decrees.php
 */

require __DIR__ . '/lib.php';

send_cors();
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$c = cfg();

// Optional shared-key gate.
if ($c['public_api_key'] !== '') {
  $key = $_GET['key'] ?? '';
  if (!is_string($key) || !hash_equals($c['public_api_key'], $key)) {
    http_response_code(403);
    echo json_encode(['error' => 'forbidden']);
    exit;
  }
}

$items = load_decrees();

// Newest first (date stored as YYYY-MM-DD).
usort($items, function ($a, $b) {
  return strcmp($b['date'] ?? '', $a['date'] ?? '');
});

$out = array_map(function ($it) {
  return [
    'id'    => $it['id']    ?? '',
    'karar' => $it['karar'] ?? '',
    'title' => $it['title'] ?? '',
    'date'  => $it['date']  ?? '',
    'url'   => isset($it['file']) ? pdf_url($it['file']) : '',
  ];
}, $items);

echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
