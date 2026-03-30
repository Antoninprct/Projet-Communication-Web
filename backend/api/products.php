<?php

declare(strict_types=1);



function dbRequestProducts(PDO $db): array
{
    $query = $db->query('
        SELECT
            p.*,
            ROUND(AVG(r.note), 2) AS avg_rating
        FROM products p
        LEFT JOIN reviews r ON r.product_id = p.id
        GROUP BY p.id
        ORDER BY p.id ASC
    ');

    $products = $query->fetchAll(PDO::FETCH_ASSOC);

    return array_map('formatProduct', $products);
}





function handleProductsRoute(PDO $pdo, string $method, ?string $idSegment): void
{
    switch ($method) {
        case 'GET':
            if ($idSegment === null) {
                // GET /api/products
                $products = dbRequestProducts($pdo);
                sendJsonResponse(200, [
                    'success' => true,
                    'data'    => $products,
                ]);
            }

            // GET /api/products/{id}
            if (!preg_match('/^\d+$/', $idSegment)) {
                sendJsonResponse(400, [
                    'success' => false,
                    'message' => 'Invalid product id',
                ]);
            }

            $id      = (int) $idSegment;
            $product = dbRequestProduct($pdo, $id);

            if ($product === null) {
                sendJsonResponse(404, [
                    'success' => false,
                    'message' => 'Product not found',
                ]);
            }

            $reviews = dbRequestReviews($pdo, $id);

            sendJsonResponse(200, [
                'success' => true,
                'data'    => array_merge($product, ['reviews' => $reviews]),
            ]);

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