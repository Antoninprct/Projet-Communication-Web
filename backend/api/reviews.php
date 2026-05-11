<?php

declare(strict_types=1);

function dbRequestReviews(PDO $db, int $productId): array
{
    $stmt = $db->prepare('
        SELECT
            r.id,
            r.user_id,
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

function dbGetReviewById(PDO $db, int $id): ?array
{
    $stmt = $db->prepare('SELECT id, user_id, product_id FROM reviews WHERE id = :id');
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $review = $stmt->fetch(PDO::FETCH_ASSOC);
    return is_array($review) ? $review : null;
}

// Ajouter un avis

function dbAddReview(PDO $db, array $reviewData): int
{
    $stmt = $db->prepare('INSERT INTO reviews (user_id, product_id, note, commentaire) VALUES (?, ?, ?, ?)');

    $stmt->execute([
        $reviewData['user_id'],
        $reviewData['product_id'],
        $reviewData['note'],
        $reviewData['commentaire'] ?? null
    ]);

    return (int) $db->lastInsertId();
}

// Modifier un avis

function dbModifyReview(PDO $db, int $id, array $reviewData): bool
{
    $stmt = $db->prepare('UPDATE reviews SET note = ?, commentaire = ? WHERE id = ?');

    return $stmt->execute([
        $reviewData['note'],
        $reviewData['commentaire'] ?? null,
        $id
    ]);
}

// Supprimer un avis

function dbDeleteReview(PDO $db, int $id): bool
{
    $stmt = $db->prepare('DELETE FROM reviews WHERE id = ?');

    return $stmt->execute([$id]);
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
            $user = requireAuth($pdo, [ROLE_CLIENT, ROLE_ADMIN]);
            $input = json_decode(file_get_contents('php://input'), true);
            if (!is_array($input) || empty($input['product_id']) || !isset($input['note'])) {
                sendJsonResponse(400, ['success' => false, 'message' => 'Données invalides']);
            }
            $input['user_id'] = (int) $user['id'];

            $id = dbAddReview($pdo, $input);
            sendJsonResponse(201, ['success' => true, 'data' => ['id' => $id]]);
            break;

        case 'PUT':
            $user = requireAuth($pdo, [ROLE_CLIENT, ROLE_ADMIN]);
            $idParam = $_GET['id'] ?? null;
            if ($idParam === null || !preg_match('/^\d+$/', (string) $idParam)) {
                sendJsonResponse(400, ['success' => false, 'message' => 'Missing or invalid review id']);
            }
            $review = dbGetReviewById($pdo, (int) $idParam);
            if ($review === null) {
                sendJsonResponse(404, ['success' => false, 'message' => 'Avis non trouvé']);
            }
            if ($user['role'] !== ROLE_ADMIN && (int) $review['user_id'] !== (int) $user['id']) {
                sendJsonResponse(401, ['success' => false, 'message' => 'Role insuffisant']);
            }
            $input = json_decode(file_get_contents('php://input'), true);
            if (!is_array($input) || !isset($input['note'])) {
                sendJsonResponse(400, ['success' => false, 'message' => 'Données invalides']);
            }
            $success = dbModifyReview($pdo, (int)$idParam, $input);
            if ($success) {
                sendJsonResponse(200, ['success' => true, 'message' => 'Avis mis à jour']);
            } else {
                sendJsonResponse(404, ['success' => false, 'message' => 'Avis non trouvé']);
            }
            break;

        case 'DELETE':
            $user = requireAuth($pdo, [ROLE_CLIENT, ROLE_ADMIN]);
            $idParam = $_GET['id'] ?? null;
            if ($idParam === null || !preg_match('/^\d+$/', (string) $idParam)) {
                sendJsonResponse(400, ['success' => false, 'message' => 'Missing or invalid review id']);
            }
            $review = dbGetReviewById($pdo, (int) $idParam);
            if ($review === null) {
                sendJsonResponse(404, ['success' => false, 'message' => 'Avis non trouvé']);
            }
            if ($user['role'] !== ROLE_ADMIN && (int) $review['user_id'] !== (int) $user['id']) {
                sendJsonResponse(401, ['success' => false, 'message' => 'Role insuffisant']);
            }
            $success = dbDeleteReview($pdo, (int)$idParam);
            if ($success) {
                sendJsonResponse(200, ['success' => true, 'message' => 'Avis supprimé']);
            } else {
                sendJsonResponse(404, ['success' => false, 'message' => 'Avis non trouvé']);
            }
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
