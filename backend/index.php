<?php

declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

function sendJsonResponse(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// CORS
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    header('Allow: GET, POST, PUT, DELETE, OPTIONS');
    sendJsonResponse(204, []);
}

require __DIR__ . '/database.php';
require __DIR__ . '/api/products.php';
require __DIR__ . '/api/reviews.php';

// Routes
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$scriptBasePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/');

if ($scriptBasePath !== '' && $scriptBasePath !== '/' && str_starts_with($requestPath, $scriptBasePath)) {
    $requestPath = substr($requestPath, strlen($scriptBasePath)) ?: '/';
}

$requestPath = '/' . ltrim($requestPath, '/');

// Autorise /backend/index.php/api/products
if (str_starts_with($requestPath, '/index.php')) {
    $requestPath = substr($requestPath, strlen('/index.php')) ?: '/';
    $requestPath = '/' . ltrim($requestPath, '/');
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Route produits
if (preg_match('#^/api/products/?$#', $requestPath)) {
    handleProductsRoute($pdo, $method, null);
}

// Route produit spécifique
if (preg_match('#^/api/products/([^/]+)/?$#', $requestPath, $matches)) {
    handleProductsRoute($pdo, $method, $matches[1]);
}

// Route avis via /api/reviews/?id=N ou /reviews/?id=N
if (preg_match('#^(api/)?reviews/?$#', ltrim($requestPath, '/'))) {
    handleReviewsRoute($pdo, $method);
}

sendJsonResponse(404, [
    'success' => false,
    'message' => 'Route not found',
]);
