<?php
session_start();

if (!isset($_SESSION['chat_id'])) {
    $_SESSION['chat_id'] = bin2hex(random_bytes(16));
}

$current_user = [
    'id'    => $_SESSION['chat_id'],
    'login' => htmlspecialchars(
        $_SESSION['user']['login'] ?? ('Guest-' . rand(1000, 9999))
    ),
    'role'  => htmlspecialchars(
        $_SESSION['user']['role'] ?? 'client'
    ),
];
?>

<meta
    name="chat-user"
    content='<?= json_encode(
        $current_user,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    ) ?>'
>

<button
    id="support-toggle"
    class="support-toggle"
    type="button"
    aria-label="Ouvrir le chat support"
    aria-controls="support-chat-window"
    aria-expanded="false"
>
    <i class="bi bi-chat-dots-fill"></i>
</button>

<section
    id="support-chat-window"
    class="support-chat-window"
    aria-label="Chat support"
    aria-hidden="true"
>
    <header class="support-header">
        <div class="support-header__info">
            <strong>Support BAWBAW ACADEMY</strong>

            <p class="support-subtitle">
                <span
                    id="support-status"
                    data-status="offline"
                    title="Hors ligne"
                ></span>

                <span id="support-status-label">
                    Hors ligne
                </span>
            </p>
        </div>

        <button
            id="support-close"
            class="support-close"
            type="button"
            aria-label="Fermer le chat"
        >
            <i class="bi bi-x-lg"></i>
        </button>
    </header>

    <div
        id="support-messages"
        class="support-messages"
        role="log"
        aria-live="polite"
        aria-label="Messages du chat"
    >
        <article
            class="support-msg support-msg--other support-msg--agent"
        >
            <footer class="support-msg__meta">
                <span class="support-msg__login">
                    Support
                </span>
            </footer>

            <p class="support-msg__bubble">
                Bienvenue, votre message sera transmis au support.
            </p>
        </article>
    </div>

    <form
        id="support-form"
        class="support-form"
        novalidate
    >
        <input
            id="support-input"
            type="text"
            placeholder="Écrire votre message…"
            autocomplete="off"
            maxlength="300"
            aria-label="Message support"
        >

        <button
            type="submit"
            aria-label="Envoyer le message"
        >
            <i class="bi bi-send-fill"></i>
        </button>
    </form>
</section>