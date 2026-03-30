<?php

declare(strict_types=1);

function dbRequestReviews(PDO $db, int $productId): array
{
    $stmt = $db->prepare('
        SELECT
            r.id,
            r.note,
            r.commentaire,
            r.created_at,
            u.nom AS auteur
        FROM reviews r
        INNER JOIN user u ON u.id = r.user_id
        WHERE r.product_id = :product_id
        ORDER BY r.created_at DESC
    ');

    $stmt->bindValue(':product_id', $productId, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function handleReviewsRoute(PDO $pdo, string $method): void
{
    switch ($method) {
        case 'GET':
            $idParam = $_GET['id'] ?? null;

            if ($idParam === null || !preg_match('/^\d+$/', (string) $idParam)) {
                sendJsonResponse(400, [
                    'success' => false,
                    'message' => 'Missing or invalid product id',
                ]);
                break;
            }

            $productId = (int) $idParam;
            $reviews = dbRequestReviews($pdo, $productId);

            sendJsonResponse(200, [
                'success' => true,
                'data' => $reviews,
            ]);
            break;

        case 'POST':
        case 'PUT':
        case 'DELETE':
            sendJsonResponse(503, [
                'success' => false,
                'message' => 'Route désactivée (admin uniquement)',
            ]);
            break;

        default:
            header('Allow: GET, POST, PUT, DELETE, OPTIONS');
            sendJsonResponse(405, [
                'success' => false,
                'message' => 'Méthode non autorisée',
            ]);
            break;
    }
}
