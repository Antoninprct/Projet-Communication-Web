<?php

declare(strict_types=1);

function handleProductsRoute(PDO $pdo, string $method, ?string $idSegment): void
{
    switch ($method) {
        case 'GET':
            if ($idSegment === null) {
                getAllProducts($pdo);
            }

            getProductById($pdo, $idSegment);

        case 'POST':
        case 'PUT':
        case 'DELETE':
            sendJsonResponse(503, [
                'success' => false,
                'message' => 'This admin-only route is currently disabled until authentication is implemented.',
            ]);

        default:
            header('Allow: GET, POST, PUT, DELETE, OPTIONS');
            sendJsonResponse(405, [
                'success' => false,
                'message' => 'Method not allowed',
            ]);
    }
}

function getAllProducts(PDO $pdo): void
{
    $query = $pdo->query('SELECT * FROM products ORDER BY id ASC');
    $products = $query->fetchAll(PDO::FETCH_ASSOC);

    sendJsonResponse(200, [
        'success' => true,
        'data' => $products,
    ]);
}

function getProductById(PDO $pdo, string $idSegment): void
{
    if (!preg_match('/^\d+$/', $idSegment)) {
        sendJsonResponse(400, [
            'success' => false,
            'message' => 'Invalid product id',
        ]);
    }

    $productId = (int) $idSegment;
    $statement = $pdo->prepare('SELECT * FROM products WHERE id = :id');
    $statement->bindValue(':id', $productId, PDO::PARAM_INT);
    $statement->execute();

    $product = $statement->fetch(PDO::FETCH_ASSOC);

    if ($product === false) {
        sendJsonResponse(404, [
            'success' => false,
            'message' => 'Product not found',
        ]);
    }

    sendJsonResponse(200, [
        'success' => true,
        'data' => $product,
    ]);
}
