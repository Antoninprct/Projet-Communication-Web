<?php

declare(strict_types=1);

require_once __DIR__ . '/../constantes.php';

function getAuthorizationHeaderValue(): string
{
    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (is_array($headers)) {
            foreach ($headers as $key => $value) {
                if (strtolower((string) $key) === 'authorization') {
                    return (string) $value;
                }
            }
        }
    }

    return (string) ($_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['Authorization'] ?? '');
}

function getBearerToken(): ?string
{
    $header = trim(getAuthorizationHeaderValue());
    if ($header === '') {
        return null;
    }

    if (preg_match('/^Bearer\s+(\S+)$/i', $header, $matches)) {
        return $matches[1];
    }

    return null;
}

function getAuthUser(PDO $pdo): ?array
{
    $token = getBearerToken();
    if ($token === null) {
        return null;
    }

    $stmt = $pdo->prepare('SELECT id, nom, email, role, token, token_expires FROM user WHERE token = :token');
    $stmt->bindValue(':token', $token, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!is_array($user)) {
        return null;
    }

    $expires = isset($user['token_expires']) ? (int) $user['token_expires'] : 0;
    if ($expires > 0 && $expires < time()) {
        $clear = $pdo->prepare('UPDATE user SET token = NULL, token_expires = NULL WHERE id = :id');
        $clear->bindValue(':id', $user['id'], PDO::PARAM_INT);
        $clear->execute();
        return null;
    }

    return $user;
}

function requireAuth(PDO $pdo, ?array $allowedRoles = null): array
{
    $user = getAuthUser($pdo);
    if (!is_array($user)) {
        sendJsonResponse(401, [
            'success' => false,
            'message' => 'Token invalide ou manquant',
        ]);
    }

    if ($allowedRoles !== null && !in_array($user['role'], $allowedRoles, true)) {
        sendJsonResponse(401, [
            'success' => false,
            'message' => 'Role insuffisant',
        ]);
    }

    return $user;
}

function generateAuthToken(): string
{
    return bin2hex(random_bytes(32));
}
