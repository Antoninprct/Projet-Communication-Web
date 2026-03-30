<?php
$activePage = 'auth';
require __DIR__ . '/partials/url.php';
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GHOST OPS - Authentification</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Barlow+Condensed:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?= app_url('pages/css/base.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/auth.css') ?>">
    <link rel="stylesheet" href="<?= app_url('pages/css/support-chat.css') ?>">
</head>

<body>
    <?php require __DIR__ . '/partials/nav.php'; ?>

    <main class="login-wrapper">
        <div class="login-bg"></div>
        <section class="login-card" id="login-form-wrap">
            <div class="login-corner tl"></div>
            <div class="login-corner tr"></div>
            <div class="login-corner bl"></div>
            <div class="login-corner br"></div>

            <div class="login-logo">GHOST<span>OPS</span></div>
            <div class="login-subtitle">ACCES OPERATEUR</div>

            <div class="auth-tabs">
                <button id="tab-login" class="auth-tab active" type="button">Connexion</button>
                <button id="tab-register" class="auth-tab" type="button">Creer un compte</button>
            </div>

            <form id="form-login">
                <label class="form-label-tactical" for="login-email">Email</label>
                <input class="form-control-tactical w-100 mb-3" id="login-email" type="email" placeholder="operator@ghostops.local">
                <label class="form-label-tactical" for="login-password">Mot de passe</label>
                <input class="form-control-tactical w-100 mb-4" id="login-password" type="password" placeholder="********">
                <button class="btn-tactical w-100" type="submit">Connexion</button>
            </form>

            <form id="form-register" class="d-none">
                <label class="form-label-tactical" for="register-name">Nom operateur</label>
                <input class="form-control-tactical w-100 mb-3" id="register-name" type="text" placeholder="Nom d'equipe">
                <label class="form-label-tactical" for="register-email">Email</label>
                <input class="form-control-tactical w-100 mb-3" id="register-email" type="email" placeholder="operator@ghostops.local">
                <label class="form-label-tactical" for="register-password">Mot de passe</label>
                <input class="form-control-tactical w-100 mb-4" id="register-password" type="password" placeholder="********">
                <button class="btn-tactical w-100" type="submit">Creer le compte</button>
            </form>
        </section>
    </main>

    <?php require __DIR__ . '/partials/footer.php'; ?>
    <div id="toast-cart" class="toast-cart"><i class="bi bi-check2-circle me-2"></i>ACTION CONFIRMEE</div>
    <?php require __DIR__ . '/partials/support-chat.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.APP_BASE_PATH = <?= json_encode(app_base_path(), JSON_UNESCAPED_SLASHES) ?>;
    </script>
    <script src="<?= app_url('pages/js/auth.js') ?>"></script>
    <script src="<?= app_url('pages/js/support-chat.js') ?>"></script>
</body>

</html>