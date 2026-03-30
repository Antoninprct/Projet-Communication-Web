<?php
$activePage = 'products';
require __DIR__ . '/partials/url.php';
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GHOST OPS - Produit</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Barlow+Condensed:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?= app_url('pages/css/base.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/product-detail.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/support-chat.css') ?>">
</head>

<body>
    <?php require __DIR__ . '/partials/nav.php'; ?>

    <main class="container py-4">
        <div class="breadcrumb-tactical mb-3">
            <a href="<?= app_url('index.php?page=home') ?>">Accueil</a> / <a href="<?= app_url('index.php?page=products') ?>">Arsenal</a> / <span id="detail-breadcrumb">Produit</span>
        </div>

        <div class="row g-5" id="detail-layout">
            <div class="col-lg-6">
                <div class="product-detail-img" id="detail-img-box"></div>
            </div>
            <div class="col-lg-6">
                <div class="d-flex gap-2 mb-2" id="detail-tags"></div>
                <div id="detail-category" class="detail-category"></div>
                <h1 id="detail-name" class="detail-name"></h1>
                <div id="detail-rating" class="product-rating my-2"></div>
                <div class="d-flex align-items-baseline gap-3 my-3">
                    <span id="detail-price" class="detail-price"></span>
                    <span id="detail-price-old" class="detail-price-old"></span>
                </div>
                <p id="detail-desc" class="detail-desc"></p>
                <div class="alert-tactical mb-3">Produit terrain teste, compatible parties loisir 18+.</div>
                <div class="d-flex align-items-center gap-3 mb-3 flex-wrap">
                    <button class="btn-tactical" type="button" id="detail-add-cart"><i class="bi bi-bag-plus me-2"></i>Ajouter au panier</button>
                    <a class="btn-outline-tactical" href="<?= app_url('index.php?page=products') ?>">Retour catalogue</a>
                </div>
                <div class="mt-4">
                    <h2 class="spec-title">Specifications</h2>
                    <table class="spec-table" id="detail-specs"></table>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <div class="section-label mb-3">Produits similaires</div>
            <div class="row g-3" id="related-products"></div>
        </div>
    </main>

    <?php require __DIR__ . '/partials/footer.php'; ?>

    <div id="toast-cart" class="toast-cart"><i class="bi bi-check2-circle me-2"></i>AJOUTE AU PANIER</div>
    <?php require __DIR__ . '/partials/support-chat.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.APP_BASE_PATH = <?= json_encode(app_base_path(), JSON_UNESCAPED_SLASHES) ?>;
    </script>
    <script src="<?= app_url('pages/js/catalog-data.js') ?>"></script>
    <script src="<?= app_url('pages/js/product-detail.js') ?>"></script>
    <script src="<?= app_url('pages/js/support-chat.js') ?>"></script>
</body>

</html>