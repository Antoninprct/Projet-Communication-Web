<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function sendJsonResponse(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    header('Allow: GET, POST, PUT, DELETE, OPTIONS');
    sendJsonResponse(204, []);
}

require __DIR__ . '/database.php';
require __DIR__ . '/api/products.php';

$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$scriptBasePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/');

if ($scriptBasePath !== '' && $scriptBasePath !== '/' && str_starts_with($requestPath, $scriptBasePath)) {
    $requestPath = substr($requestPath, strlen($scriptBasePath)) ?: '/';
}

$requestPath = '/' . ltrim($requestPath, '/');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (preg_match('#^/api/products/?$#', $requestPath)) {
    handleProductsRoute($pdo, $method, null);
}

if (preg_match('#^/api/products/([^/]+)/?$#', $requestPath, $matches)) {
    handleProductsRoute($pdo, $method, $matches[1]);
}

sendJsonResponse(404, [
    'success' => false,
    'message' => 'Route not found',
]);
