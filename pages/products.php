<?php
$activePage = 'products';
require __DIR__ . '/partials/url.php';
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GHOST OPS - Arsenal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Barlow+Condensed:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?= app_url('pages/css/base.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/products.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/support-chat.css') ?>">
</head>

<body>
    <?php require __DIR__ . '/partials/nav.php'; ?>

    <main>
        <section class="page-header">
            <div class="container">
                <div class="section-label">Inventaire complet</div>
                <h1 class="section-title">L'ARSENAL <span class="text-accent">GHOST OPS</span></h1>
                <p class="header-sub">&gt; 48 PRODUITS DISPONIBLES // LIVRAISON EXPRESS 48H</p>
            </div>
        </section>

        <section class="container py-4">
            <div class="filter-bar">
                <span class="filter-label">FILTRER :</span>
                <button class="filter-btn active" data-filter="all" type="button">TOUT</button>
                <button class="filter-btn" data-filter="aeg" type="button">AEG</button>
                <button class="filter-btn" data-filter="gbb" type="button">GBB / GAZ</button>
                <button class="filter-btn" data-filter="sniper" type="button">SNIPER</button>
                <button class="filter-btn" data-filter="gear" type="button">EQUIPEMENT</button>
                <button class="filter-btn" data-filter="promo" type="button">PROMOS</button>
                <div class="ms-auto search-wrap">
                    <input id="searchInput" type="text" class="form-control-tactical" placeholder="RECHERCHER..." aria-label="Rechercher un produit">
                </div>
            </div>

            <div class="row g-4" id="products-grid"></div>
        </section>
    </main>

    <?php require __DIR__ . '/partials/footer.php'; ?>

    <div id="toast-cart" class="toast-cart">
        <i class="bi bi-check2-circle me-2"></i>AJOUTE AU PANIER
    </div>

    <?php require __DIR__ . '/partials/support-chat.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.APP_BASE_PATH = <?= json_encode(app_base_path(), JSON_UNESCAPED_SLASHES) ?>;
    </script>
    <script src="<?= app_url('pages/js/catalog-data.js') ?>"></script>
    <script src="<?= app_url('pages/js/products.js') ?>"></script>
    <script src="<?= app_url('pages/js/support-chat.js') ?>"></script>
</body>

</html>