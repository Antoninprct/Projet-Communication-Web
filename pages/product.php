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

                <!-- Admin Actions -->
                <div class="d-flex align-items-center justify-content-between gap-3 mb-3 flex-wrap" style="border-top:1px solid #444; padding-top:15px;" id="admin-actions-container">
                    <button class="btn btn-warning rounded-0 fw-bold px-4 py-2" style="font-family:'Oswald', sans-serif;" id="btn-edit-product" data-bs-toggle="modal" data-bs-target="#editProductModal"><i class="bi bi-pencil-square me-2"></i>Modifier</button>
                    <button class="btn btn-danger rounded-0 fw-bold px-4 py-2" style="font-family:'Oswald', sans-serif;" id="btn-delete-product"><i class="bi bi-trash me-2"></i>Supprimer</button>
                </div>

                <div class="mt-4">
                    <h2 class="spec-title">Specifications</h2>
                    <table class="spec-table" id="detail-specs"></table>
                </div>
                <div class="mt-4">
                    <h2 class="spec-title">Avis clients</h2>
                    <form id="review-form" class="review-form">
                        <input type="hidden" id="review-id" value="">
                        <div class="review-form-grid">
                            <div class="review-field">
                                <label>Note *</label>
                                <input type="hidden" id="review-note" value="">
                                <div class="rating-stars" role="radiogroup" aria-label="Note">
                                    <button type="button" class="rating-star-button" data-rating="1" aria-pressed="false" aria-label="1 etoile">★</button>
                                    <button type="button" class="rating-star-button" data-rating="2" aria-pressed="false" aria-label="2 etoiles">★</button>
                                    <button type="button" class="rating-star-button" data-rating="3" aria-pressed="false" aria-label="3 etoiles">★</button>
                                    <button type="button" class="rating-star-button" data-rating="4" aria-pressed="false" aria-label="4 etoiles">★</button>
                                    <button type="button" class="rating-star-button" data-rating="5" aria-pressed="false" aria-label="5 etoiles">★</button>
                                </div>
                            </div>
                            <div class="review-field">
                                <label for="review-comment">Commentaire *</label>
                                <textarea id="review-comment" rows="3" required></textarea>
                            </div>
                        </div>
                        <div class="review-form-actions">
                            <button class="btn-tactical" type="submit" id="review-submit">Envoyer l'avis</button>
                            <button class="btn-outline-tactical" type="button" id="review-cancel" hidden>Annuler</button>
                            <span class="review-hint">Les avis sont publics. Modifiables apres publication.</span>
                        </div>
                    </form>
                    <div id="detail-reviews" class="reviews-list"></div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <div class="section-label mb-3">Produits similaires</div>
            <div class="row g-3" id="related-products"></div>
        </div>
    </main>

    <?php require __DIR__ . '/partials/footer.php'; ?>

    <!-- Admin Edit Product Modal -->
    <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background-color: var(--bg-card); border: 1px solid var(--accent); color: var(--text-main);">
                <div class="modal-header" style="border-bottom: 1px solid var(--grey-light);">
                    <h5 class="modal-title" id="editProductModalLabel">Modifier le produit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editProductForm">
                        <div class="mb-3">
                            <label for="ep-nom" class="form-label">Nom *</label>
                            <input type="text" class="form-control" id="ep-nom" required>
                        </div>
                        <div class="mb-3">
                            <label for="ep-desc" class="form-label">Description</label>
                            <textarea class="form-control" id="ep-desc"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-6 mb-3">
                                <label for="ep-prix" class="form-label">Prix *</label>
                                <input type="number" step="0.01" class="form-control" id="ep-prix" required>
                            </div>
                            <div class="col-6 mb-3">
                                <label for="ep-old-price" class="form-label">Ancien prix</label>
                                <input type="number" step="1" class="form-control" id="ep-old-price">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="ep-image" class="form-label">URL de l'image</label>
                            <input type="text" class="form-control" id="ep-image">
                        </div>
                        <div class="mb-3">
                            <label for="ep-cat" class="form-label">Catégorie</label>
                            <select class="form-select" id="ep-cat">
                                <option value="Fusil d'assaut">Fusil d'assaut</option>
                                <option value="AEG">AEG</option>
                                <option value="Pistolet GBB">Pistolet GBB</option>
                                <option value="Fusil de precision">Sniper</option>
                                <option value="Equipement">Equipement</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-tactical w-100">Mettre à jour</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Admin Delete Confirmation Modal -->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background-color: var(--bg-card); border: 1px solid var(--danger-red); color: var(--text-main);">
                <div class="modal-header" style="border-bottom: 1px solid var(--grey-light);">
                    <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmer la suppression</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">Cette action est irreversible. Voulez-vous vraiment supprimer ce produit ?</p>
                </div>
                <div class="modal-footer" style="border-top: 1px solid var(--grey-light);">
                    <button type="button" class="btn btn-outline-light rounded-0" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-danger rounded-0" id="confirm-delete-product">
                        <i class="bi bi-trash me-2"></i>Supprimer
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Review Delete Confirmation Modal -->
    <div class="modal fade" id="confirmDeleteReviewModal" tabindex="-1" aria-labelledby="confirmDeleteReviewModalLabel" aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background-color: var(--bg-card); border: 1px solid var(--danger-red); color: var(--text-main);">
                <div class="modal-header" style="border-bottom: 1px solid var(--grey-light);">
                    <h5 class="modal-title" id="confirmDeleteReviewModalLabel">Confirmer la suppression</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">Cette action est irreversible. Voulez-vous vraiment supprimer cet avis ?</p>
                </div>
                <div class="modal-footer" style="border-top: 1px solid var(--grey-light);">
                    <button type="button" class="btn btn-outline-light rounded-0" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-danger rounded-0" id="confirm-delete-review">
                        <i class="bi bi-trash me-2"></i>Supprimer
                    </button>
                </div>
            </div>
        </div>
    </div>

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