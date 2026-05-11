<nav class="navbar navbar-ghost navbar-expand-lg px-3">
    <div class="container-fluid">
        <a class="navbar-brand" href="<?= app_url('index.php') ?>">GHOST<span>OPS</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Menu principal">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
            <ul class="navbar-nav ms-auto align-items-lg-center gap-1">
                <li class="nav-item"><a class="nav-link-ghost<?= ($activePage ?? '') === 'home' ? ' active' : '' ?>" href="<?= app_url('index.php?page=home') ?>">Accueil</a></li>
                <li class="nav-item"><a class="nav-link-ghost<?= ($activePage ?? '') === 'products' ? ' active' : '' ?>" href="<?= app_url('index.php?page=products') ?>">Arsenal</a></li>
                <li class="nav-item">
                    <a class="nav-link-ghost<?= ($activePage ?? '') === 'auth' ? ' active' : '' ?>" href="<?= app_url('index.php?page=auth') ?>" id="nav-auth-link">
                        <i class="bi bi-person-circle me-1"></i>Connexion
                    </a>
                </li>
                <li class="nav-item d-none" id="nav-auth-user"></li>
                <li class="nav-item d-none" id="nav-auth-logout">
                    <button class="nav-link-ghost nav-logout-btn" type="button">
                        <i class="bi bi-box-arrow-right me-1"></i>Déconnexion
                    </button>
                </li>
            </ul>
        </div>
    </div>
</nav>
<script defer src="<?= app_url('pages/js/auth-state.js') ?>"></script>