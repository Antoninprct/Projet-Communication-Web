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
            <div id="admin-actions" class="mb-4">
                <button class="btn-tactical mb-3" data-bs-toggle="modal" data-bs-target="#addProductModal"><i class="bi bi-plus-circle me-2"></i>Ajouter un produit (Admin)</button>
            </div>

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

    <!-- Admin Add Product Modal -->
    <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background-color: var(--bg-card); border: 1px solid var(--accent); color: var(--text-main);">
                <div class="modal-header" style="border-bottom: 1px solid var(--grey-light);">
                    <h5 class="modal-title" id="addProductModalLabel">Ajouter un produit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addProductForm">
                        <div class="mb-3">
                            <label for="p-nom" class="form-label">Nom *</label>
                            <input type="text" class="form-control" id="p-nom" required>
                        </div>
                        <div class="mb-3">
                            <label for="p-desc" class="form-label">Description</label>
                            <textarea class="form-control" id="p-desc"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-6 mb-3">
                                <label for="p-prix" class="form-label">Prix *</label>
                                <input type="number" step="0.01" class="form-control" id="p-prix" required>
                            </div>
                            <div class="col-6 mb-3">
                                <label for="p-old-price" class="form-label">Ancien prix</label>
                                <input type="number" step="0.01" class="form-control" id="p-old-price">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="p-image" class="form-label">URL de l'image</label>
                            <input type="text" class="form-control" id="p-image">
                        </div>
                        <div class="mb-3">
                            <label for="p-cat" class="form-label">Catégorie</label>
                            <select class="form-select" id="p-cat">
                                <option value="AEG">AEG</option>
                                <option value="Pistolet GBB">Pistolet GBB</option>
                                <option value="Fusil de precision">Sniper</option>
                                <option value="Equipement">Equipement</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-tactical w-100">Créer</button>
                    </form>
                </div>
            </div>
        </div>
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