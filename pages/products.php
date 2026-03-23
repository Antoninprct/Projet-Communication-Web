<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GHOST OPS - Arsenal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Barlow+Condensed:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/products.css">
    <link rel="stylesheet" href="css/support-chat.css">
</head>

<body>
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

    <footer>
        <div class="container">
            <div class="footer-bottom text-center">© 2026 GHOST OPS TACTICAL - TOUS DROITS RESERVES</div>
        </div>
    </footer>

    <div id="toast-cart" class="toast-cart">
        <i class="bi bi-check2-circle me-2"></i>AJOUTE AU PANIER
    </div>

    <button id="support-toggle" class="support-toggle" type="button" aria-label="Ouvrir le chat support" aria-controls="support-chat-window" aria-expanded="false">
        <i class="bi bi-chat-dots-fill"></i>
    </button>

    <section id="support-chat-window" class="support-chat-window" aria-label="Chat support" aria-hidden="true">
        <header class="support-header">
            <div>
                <strong>Support GHOST OPS</strong>
                <p class="support-subtitle">En ligne</p>
            </div>
            <button id="support-close" class="support-close" type="button" aria-label="Fermer le chat">
                <i class="bi bi-x-lg"></i>
            </button>
        </header>

        <div id="support-messages" class="support-messages">
            <article class="support-msg support-msg-agent">
                <p>Bienvenue, votre message sera transmis au support.</p>
            </article>
        </div>

        <form id="support-form" class="support-form">
            <input id="support-input" type="text" placeholder="Ecrire votre message..." autocomplete="off" maxlength="300" aria-label="Message support">
            <button type="submit" aria-label="Envoyer le message">
                <i class="bi bi-send-fill"></i>
            </button>
        </form>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/products.js"></script>
    <script src="js/support-chat.js"></script>
</body>

</html>