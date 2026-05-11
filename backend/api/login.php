<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';

function findUserByEmail(PDO $pdo, string $email): ?array
{
    $stmt = $pdo->prepare('SELECT id, nom, email, mot_de_passe, role FROM user WHERE email = :email LIMIT 1');
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    return is_array($user) ? $user : null;
}

function saveAuthToken(PDO $pdo, int $userId, string $token): void
{
    $expires = time() + AUTH_TOKEN_TTL;
    $stmt = $pdo->prepare('UPDATE user SET token = :token, token_expires = :expires WHERE id = :id');
    $stmt->bindValue(':token', $token, PDO::PARAM_STR);
    $stmt->bindValue(':expires', $expires, PDO::PARAM_INT);
    $stmt->bindValue(':id', $userId, PDO::PARAM_INT);
    $stmt->execute();
}

function handleLoginRoute(PDO $pdo, string $method): void
{
    if ($method !== 'POST') {
        header('Allow: POST, OPTIONS');
        sendJsonResponse(405, [
            'success' => false,
            'message' => 'Methode non autorisee',
        ]);
    }

    $input = json_decode(file_get_contents('php://input'), true);
    if (!is_array($input)) {
        sendJsonResponse(400, [
            'success' => false,
            'message' => 'Payload invalide',
        ]);
    }

    $action = isset($input['action']) ? (string) $input['action'] : 'login';
    $email = isset($input['email']) ? trim((string) $input['email']) : '';
    $password = isset($input['password']) ? (string) $input['password'] : '';

    if ($email === '' || $password === '') {
        sendJsonResponse(400, [
            'success' => false,
            'message' => 'Email et mot de passe requis',
        ]);
    }

    if ($action === 'register') {
        $name = isset($input['name']) ? trim((string) $input['name']) : '';
        if ($name === '') {
            sendJsonResponse(400, [
                'success' => false,
                'message' => 'Nom requis',
            ]);
        }

        $existing = findUserByEmail($pdo, $email);
        if ($existing !== null) {
            sendJsonResponse(409, [
                'success' => false,
                'message' => 'Email deja utilise',
            ]);
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('INSERT INTO user (nom, email, mot_de_passe, role) VALUES (:nom, :email, :mdp, :role)');
        $stmt->bindValue(':nom', $name, PDO::PARAM_STR);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->bindValue(':mdp', $hash, PDO::PARAM_STR);
        $stmt->bindValue(':role', ROLE_CLIENT, PDO::PARAM_STR);
        $stmt->execute();
    }

    $user = findUserByEmail($pdo, $email);
    if ($user === null) {
        sendJsonResponse(401, [
            'success' => false,
            'message' => 'Identifiants invalides',
        ]);
    }

    $storedPassword = (string) ($user['mot_de_passe'] ?? '');
    $passwordValid = false;

    if ($storedPassword !== '' && password_verify($password, $storedPassword)) {
        $passwordValid = true;
    }

    if (!$passwordValid) {
        sendJsonResponse(401, [
            'success' => false,
            'message' => 'Identifiants invalides',
        ]);
    }

    $token = generateAuthToken();
    saveAuthToken($pdo, (int) $user['id'], $token);

    sendJsonResponse(200, [
        'success' => true,
        'token' => $token,
        'role' => $user['role'],
        'user' => [
            'id' => (int) $user['id'],
            'name' => $user['nom'],
            'email' => $user['email'],
        ],
    ]);
}
