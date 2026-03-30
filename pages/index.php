<?php
$activePage = 'home';
require __DIR__ . '/partials/url.php';
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GHOST OPS - Accueil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Barlow+Condensed:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?= app_url('pages/css/base.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/home.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/products.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/support-chat.css') ?>">
</head>

<body>
    <?php require __DIR__ . '/partials/nav.php'; ?>

    <main>
        <section class="hero">
            <div class="hero-bg"></div>
            <div class="hero-grid-lines"></div>
            <svg class="hero-crosshair" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="#8fb54a" stroke-width="1" />
                <circle cx="100" cy="100" r="70" stroke="#8fb54a" stroke-width="0.5" stroke-dasharray="5 5" />
                <circle cx="100" cy="100" r="8" stroke="#8fb54a" stroke-width="2" />
                <line x1="100" y1="10" x2="100" y2="50" stroke="#8fb54a" stroke-width="1.5" />
                <line x1="100" y1="150" x2="100" y2="190" stroke="#8fb54a" stroke-width="1.5" />
                <line x1="10" y1="100" x2="50" y2="100" stroke="#8fb54a" stroke-width="1.5" />
                <line x1="150" y1="100" x2="190" y2="100" stroke="#8fb54a" stroke-width="1.5" />
                <circle cx="100" cy="100" r="45" stroke="#8fb54a" stroke-width="0.5" />
                <text x="108" y="32" fill="#8fb54a" font-size="8" font-family="monospace">N</text>
                <text x="108" y="178" fill="#8fb54a" font-size="8" font-family="monospace">S</text>
            </svg>
            <div class="container position-relative">
                <div class="row">
                    <div class="col-lg-7">
                        <span class="hero-badge">TACTICAL AIRSOFT GEAR // EDITION 2024</span>
                        <h1 class="hero-title">DOMINEZ<br><span class="accent-word">LE TERRAIN</span><br><span class="grey-word">OPERATIONS</span></h1>
                        <p class="hero-sub">&gt; EQUIPEMENT PROFESSIONNEL POUR JOUEURS AVANCES<br>&gt; REPLIQUES CERTIFIEES ET ACCESSOIRES TACTIQUES<br>&gt; LIVRAISON SECURISEE SOUS 48H</p>
                        <div class="hero-cta">
                            <a class="btn-tactical" href="<?= app_url('index.php?page=products') ?>">Voir l'arsenal</a>
                            <a class="btn-outline-tactical" href="#features-section">En savoir plus</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="stats-strip">
            <div class="container">
                <div class="row">
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <div class="stat-num">500+</div>
                            <div class="stat-label">Produits en stock</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <div class="stat-num">12K+</div>
                            <div class="stat-label">Clients equipes</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <div class="stat-num">98%</div>
                            <div class="stat-label">Satisfaction</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <div class="stat-num">48H</div>
                            <div class="stat-label">Livraison express</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="py-5" id="features-section">
            <div class="container py-3">
                <div class="row mb-4">
                    <div class="col-lg-6">
                        <div class="section-label">Pourquoi GHOST OPS</div>
                        <h2 class="section-title">L'EQUIPEMENT DES<br><span class="text-accent">VRAIS OPERATEURS</span></h2>
                    </div>
                    <div class="col-lg-6 d-flex align-items-end">
                        <p class="text-muted-ghost feature-intro">Depuis 2012, Ghost Ops fournit aux airsofteurs francais du materiel selectionne selon des criteres de performance, durabilite et realisme.</p>
                    </div>
                </div>
                <div class="row g-4">
                    <div class="col-md-6 col-lg-3">
                        <article class="feature-card"><i class="bi bi-shield-check feature-icon"></i>
                            <h3 class="feature-title">Qualite testee</h3>
                            <p class="feature-text">Selection validee en conditions reelles.</p>
                        </article>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <article class="feature-card"><i class="bi bi-truck feature-icon"></i>
                            <h3 class="feature-title">Expedition rapide</h3>
                            <p class="feature-text">Preparation en 24h sur references disponibles.</p>
                        </article>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <article class="feature-card"><i class="bi bi-gear feature-icon"></i>
                            <h3 class="feature-title">Configurable</h3>
                            <p class="feature-text">Accessoires et upgrades selon votre style de jeu.</p>
                        </article>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <article class="feature-card"><i class="bi bi-headset feature-icon"></i>
                            <h3 class="feature-title">Support terrain</h3>
                            <p class="feature-text">Aide materiel avant et apres achat.</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        <div class="section-divider"></div>

        <section class="py-5">
            <div class="container py-3">
                <div class="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
                    <div>
                        <div class="section-label">Selection du moment</div>
                        <h2 class="section-title">BEST-SELLERS <span class="text-accent">TACTIQUES</span></h2>
                    </div>
                    <a class="btn-outline-tactical" href="<?= app_url('index.php?page=products') ?>">Voir tout l'arsenal</a>
                </div>
                <div class="row g-4" id="featured-products"></div>
            </div>
        </section>

        <section class="py-4 cta-band">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <h3 class="cta-title">CREEZ VOTRE COMPTE ET BENEFICIEZ DE <span class="cta-underline">-10%</span> SUR VOTRE 1ERE COMMANDE</h3>
                    </div>
                    <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
                        <a class="btn-tactical cta-btn" href="<?= app_url('index.php?page=auth') ?>">S'inscrire maintenant</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php require __DIR__ . '/partials/footer.php'; ?>
    <?php require __DIR__ . '/partials/support-chat.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.APP_BASE_PATH = <?= json_encode(app_base_path(), JSON_UNESCAPED_SLASHES) ?>;
    </script>
    <script src="<?= app_url('pages/js/catalog-data.js') ?>"></script>
    <script src="<?= app_url('pages/js/home.js') ?>"></script>
    <script src="<?= app_url('pages/js/support-chat.js') ?>"></script>
</body>

</html>