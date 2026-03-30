<?php

declare(strict_types=1);

if (isset($_GET['id']) && preg_match('/^\d+$/', (string) $_GET['id'])) {
    header('Location: ../index.php?page=product&id=' . urlencode((string) $_GET['id']));
    exit;
}

header('Location: ../index.php?page=products');
exit;
