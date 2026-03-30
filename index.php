<?php

declare(strict_types=1);

$page = $_GET['page'] ?? 'home';

switch ($page) {
    case 'products':
        require __DIR__ . '/pages/products.php';
        break;

    case 'product':
        require __DIR__ . '/pages/product.php';
        break;

    case 'auth':
        require __DIR__ . '/pages/auth.php';
        break;

    case 'home':
    default:
        require __DIR__ . '/pages/index.php';
        break;
}
