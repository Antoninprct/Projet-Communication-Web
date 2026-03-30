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