<?php

declare(strict_types=1);


//Récupérer tous les produits

function dbRequestProducts(PDO $db): array
{
    // Requête SQL : récupère tous les produits + moyenne des notes
    $query = $db->query('
        SELECT
            p.id,
            p.nom,
            p.description,
            p.prix,
            p.old_price,
            p.stock,
            p.category,
            p.type,
            p.rating,
            COUNT(r.id) AS reviews_count,
            p.tag,
            p.promo,
            p.image_url,
            ROUND(AVG(r.note), 2) AS avg_rating
        FROM products p
        LEFT JOIN reviews r ON r.product_id = p.id
        GROUP BY p.id
        ORDER BY p.id ASC
    ');

    // Convertit en tableau
    $products = $query->fetchAll(PDO::FETCH_ASSOC);

    // Formate chaque produit
    return array_map('formatProduct', $products);
}


 //Récupérer un produit par son ID

function dbRequestProduct(PDO $db, int $id): ?array
{
    // Prépare la requête
    $stmt = $db->prepare('
        SELECT
            p.id,
            p.nom,
            p.description,
            p.prix,
            p.old_price,
            p.stock,
            p.category,
            p.type,
            p.rating,
            COUNT(r.id) AS reviews_count,
            p.tag,
            p.promo,
            p.image_url,
            ROUND(AVG(r.note), 2) AS avg_rating
        FROM products p
        LEFT JOIN reviews r ON r.product_id = p.id
        WHERE p.id = :id
        GROUP BY p.id
    ');

    // Remplace :id
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    // Récupère le résultat
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    // Si aucun produit trouvé
    if ($product === false) {
        return null;
    }

    // Formate le produit
    return formatProduct($product);
}

// Formater un produit

function formatProduct(array $product): array
{
    // Nettoie et formate les données
    return [
        'id'            => (int)   $product['id'],
        'nom'           => (string)$product['nom'],
        'description'   => $product['description'] ?? null,
        'prix'          => number_format((float)$product['prix'], 2, '.', ''),
        'old_price'     => $product['old_price'] !== null
                            ? number_format((float)$product['old_price'], 2, '.', '')
                            : null,
        'stock'         => (int)   $product['stock'],
        'category'      => $product['category'] ?? null,
        'type'          => $product['type']     ?? null,
        'rating'        => (int)   ($product['rating'] ?? 0),
        'avg_rating'    => $product['avg_rating'] !== null
                            ? (float)$product['avg_rating']
                            : null,
        'reviews_count' => (int)   ($product['reviews_count'] ?? 0),
        'tag'           => $product['tag']   ?? null,
        'promo'         => (bool)  ($product['promo'] ?? false),
        'image_url'     => $product['image_url'] ?? null,
    ];
}


// Ajouter un produit

function dbAddProduct(PDO $db, array $productData): int
{
    $stmt = $db->prepare('INSERT INTO products (nom, description, prix, old_price, stock, category, type, rating, tag, promo, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

    $stmt->execute([
        $productData['nom'],
        $productData['description'] ?? null,
        $productData['prix'],
        $productData['old_price'] ?? null,
        $productData['stock'] ?? 0,
        $productData['category'] ?? null,
        $productData['type'] ?? null,
        $productData['rating'] ?? 0,
        $productData['tag'] ?? null,
        $productData['promo'] ?? 0,
        $productData['image_url'] ?? null
    ]);

    return (int) $db->lastInsertId();
}

// Modifier un produit

function dbModifyProduct(PDO $db, int $id, array $productData): bool
{
    $stmt = $db->prepare('UPDATE products SET nom = ?, description = ?, prix = ?, old_price = ?, stock = ?, category = ?, type = ?, rating = ?, tag = ?, promo = ?, image_url = ? WHERE id = ?');

    return $stmt->execute([
        $productData['nom'],
        $productData['description'] ?? null,
        $productData['prix'],
        $productData['old_price'] ?? null,
        $productData['stock'] ?? 0,
        $productData['category'] ?? null,
        $productData['type'] ?? null,
        $productData['rating'] ?? 0,
        $productData['tag'] ?? null,
        $productData['promo'] ?? 0,
        $productData['image_url'] ?? null,
        $id
    ]);
}

// Supprimer un produit

function dbDeleteProduct(PDO $db, int $id): bool
{
    $stmt = $db->prepare('DELETE FROM products WHERE id = ?');

    return $stmt->execute([$id]);
}


// Gérer les routes API /products

function handleProductsRoute(PDO $pdo, string $method, ?string $idSegment): void
{
    switch ($method) {

        case 'GET':
            // Si pas d'ID → liste des produits
            if ($idSegment === null) {
                $products = dbRequestProducts($pdo);

                sendJsonResponse(200, [
                    'success' => true,
                    'data'    => $products,
                ]);
                break;
            }

            // Vérifie que l’ID est valide
            if (!preg_match('/^\d+$/', $idSegment)) {
                sendJsonResponse(400, [
                    'success' => false,
                    'message' => 'Invalid product id',
                ]);
                break;
            }

            $id = (int) $idSegment;

            // Récupère le produit
            $product = dbRequestProduct($pdo, $id);

            // Si non trouvé
            if ($product === null) {
                sendJsonResponse(404, [
                    'success' => false,
                    'message' => 'Product not found',
                ]);
                break;
            }

            // Réponse finale
            sendJsonResponse(200, [
                'success' => true,
                'data'    => $product,
            ]);
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            if (!is_array($input) || empty($input['nom']) || !isset($input['prix'])) {
                sendJsonResponse(400, ['success' => false, 'message' => 'Données invalides']);
            }
            $id = dbAddProduct($pdo, $input);
            sendJsonResponse(201, ['success' => true, 'data' => ['id' => $id]]);
            break;

        case 'PUT':
            if ($idSegment === null || !preg_match('/^\d+$/', $idSegment)) {
                sendJsonResponse(400, ['success' => false, 'message' => 'Invalid product id']);
            }
            $input = json_decode(file_get_contents('php://input'), true);
            if (!is_array($input) || empty($input['nom']) || !isset($input['prix'])) {
                sendJsonResponse(400, ['success' => false, 'message' => 'Données invalides']);
            }
            $success = dbModifyProduct($pdo, (int)$idSegment, $input);
            if ($success) {
                sendJsonResponse(200, ['success' => true, 'message' => 'Produit mis à jour']);
            } else {
                sendJsonResponse(404, ['success' => false, 'message' => 'Produit non trouvé']);
            }
            break;

        case 'DELETE':
            if ($idSegment === null || !preg_match('/^\d+$/', $idSegment)) {
                sendJsonResponse(400, ['success' => false, 'message' => 'Invalid product id']);
            }
            $success = dbDeleteProduct($pdo, (int)$idSegment);
            if ($success) {
                sendJsonResponse(200, ['success' => true, 'message' => 'Produit supprimé']);
            } else {
                sendJsonResponse(404, ['success' => false, 'message' => 'Produit non trouvé']);
            }
            break;

        default:
            // Méthode non autorisée
            header('Allow: GET, POST, PUT, DELETE, OPTIONS');
            sendJsonResponse(405, [
                'success' => false,
                'message' => 'Méthode non autorisée',
            ]);
            break;
    }
}