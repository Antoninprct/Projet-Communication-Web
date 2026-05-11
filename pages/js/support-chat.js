const CHAT_CONFIG = {
    WS_URL: "ws://localhost:12345",
    RECONNECT_DELAY_MS: 3000,
    MAX_RECONNECT_ATTEMPTS: 5,
};

class SupportChat {
    constructor() {
        this.toggleButton = document.getElementById("support-toggle");
        this.closeButton = document.getElementById("support-close");
        this.chatWindow = document.getElementById("support-chat-window");
        this.form = document.getElementById("support-form");
        this.input = document.getElementById("support-input");
        this.messages = document.getElementById("support-messages");
        this.statusDot = document.getElementById("support-status");
        this.statusLabel = document.getElementById("support-status-label");

        if (
            !this.toggleButton ||
            !this.chatWindow ||
            !this.form ||
            !this.input ||
            !this.messages
        ) {
            return;
        }

        this.socket = null;
        this.reconnectAttempts = 0;
        this.reconnectTimer = null;
        this.currentUser = this._resolveCurrentUser();

        this._bindUI();
        this._connectWebSocket();
    }

    _resolveCurrentUser() {
        try {
            const raw = localStorage.getItem("ghostops.auth");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.user) {
                    return {
                        id: parsed.user.id || crypto.randomUUID(),
                        login: parsed.user.name || parsed.user.email || "Operateur",
                        role: parsed.role || "client",
                    };
                }
            }
        } catch (_) {}

        const meta = document.querySelector('meta[name="chat-user"]');

        if (meta) {
            try {
                return JSON.parse(meta.getAttribute("content"));
            } catch (_) {}
        }

        if (window.CHAT_USER) {
            return window.CHAT_USER;
        }

        return {
            id: crypto.randomUUID(),
            login: "Guest-" + Math.floor(Math.random() * 10000),
            role: "client",
        };
    }

    _connectWebSocket() {
        if (
            this.socket &&
            this.socket.readyState === WebSocket.OPEN
        ) {
            return;
        }

        this.socket = new WebSocket(CHAT_CONFIG.WS_URL);

        this.socket.addEventListener("open", () => {
            this.reconnectAttempts = 0;
            this._setConnectionStatus("online");
        });

        this.socket.addEventListener("message", (event) => {
            if (!event.data) {
                return;
            }

            try {
                const data = JSON.parse(event.data);

                if (!data.text) {
                    return;
                }

                this._appendMessage(
                    data,
                    data.id === this.currentUser.id
                );
            } catch (err) {
                console.error("Invalid WS message:", err);
            }
        });

        this.socket.addEventListener("close", () => {
            this._setConnectionStatus("offline");
            this._scheduleReconnect();
        });

        this.socket.addEventListener("error", () => {
            if (
                this.socket &&
                this.socket.readyState !== WebSocket.CLOSED
            ) {
                this.socket.close();
            }
        });
    }

    _scheduleReconnect() {
        if (
            this.reconnectAttempts >=
            CHAT_CONFIG.MAX_RECONNECT_ATTEMPTS
        ) {
            return;
        }

        clearTimeout(this.reconnectTimer);

        const delay =
            CHAT_CONFIG.RECONNECT_DELAY_MS *
            Math.pow(2, this.reconnectAttempts);

        this.reconnectAttempts++;

        this.reconnectTimer = setTimeout(() => {
            this._connectWebSocket();
        }, delay);
    }

    _sendMessage(text) {
        if (!text) {
            return;
        }

        const payload = {
            id: this.currentUser.id,
            login: this.currentUser.login,
            role: this.currentUser.role,
            text,
            timestamp: new Date().toISOString(),
        };

        if (
            this.socket &&
            this.socket.readyState === WebSocket.OPEN
        ) {
            this.socket.send(JSON.stringify(payload));
        }
    }

    _formatTime(isoString) {
        const date = isoString
            ? new Date(isoString)
            : new Date();

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    _appendMessage(msg, isSelf = false) {
        const isAdmin = msg.role === "admin";

        const article = document.createElement("article");

        article.className = [
            "support-msg",
            isSelf
                ? "support-msg--self"
                : "support-msg--other",
            isAdmin
                ? "support-msg--admin"
                : "support-msg--client",
        ].join(" ");

        const meta = document.createElement("footer");

        meta.className = "support-msg__meta";

        const loginSpan = document.createElement("span");

        loginSpan.className = "support-msg__login";
        loginSpan.textContent = msg.login;

        meta.appendChild(loginSpan);

        if (isAdmin) {
            const badge = document.createElement("span");

            badge.className = "support-msg__badge";
            badge.textContent = "Admin";

            badge.setAttribute(
                "aria-label",
                "Administrateur"
            );

            meta.appendChild(badge);
        }

        const timeEl = document.createElement("time");

        timeEl.className = "support-msg__time";

        timeEl.setAttribute(
            "datetime",
            msg.timestamp || new Date().toISOString()
        );

        timeEl.textContent = this._formatTime(msg.timestamp);

        meta.appendChild(timeEl);

        const bubble = document.createElement("p");

        bubble.className = "support-msg__bubble";

        bubble.appendChild(
            document.createTextNode(msg.text)
        );

        article.appendChild(meta);
        article.appendChild(bubble);

        this.messages.appendChild(article);

        this.messages.scrollTop =
            this.messages.scrollHeight;
    }

    _setConnectionStatus(state) {
        if (this.statusDot) {
            this.statusDot.dataset.status = state;

            this.statusDot.title =
                state === "online"
                    ? "Connecté"
                    : "Hors ligne";
        }

        if (this.statusLabel) {
            this.statusLabel.textContent =
                state === "online"
                    ? "En ligne"
                    : "Hors ligne";
        }
    }

    _openChat() {
        this.chatWindow.classList.add("is-open");

        this.chatWindow.setAttribute(
            "aria-hidden",
            "false"
        );

        this.toggleButton.setAttribute(
            "aria-expanded",
            "true"
        );

        this.input.focus();
    }

    _closeChat() {
        this.chatWindow.classList.remove("is-open");

        this.chatWindow.setAttribute(
            "aria-hidden",
            "true"
        );

        this.toggleButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    _bindUI() {
        this.toggleButton.addEventListener(
            "click",
            () => {
                if (
                    this.chatWindow.classList.contains(
                        "is-open"
                    )
                ) {
                    this._closeChat();
                } else {
                    this._openChat();
                }
            }
        );

        if (this.closeButton) {
            this.closeButton.addEventListener(
                "click",
                () => this._closeChat()
            );
        }

        this.form.addEventListener(
            "submit",
            (event) => {
                event.preventDefault();

                const value =
                    this.input.value.trim();

                if (!value) {
                    return;
                }

                this._sendMessage(value);

                this.input.value = "";
                this.input.focus();
            }
        );

        this.input.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {
                    event.preventDefault();
                    this.form.requestSubmit();
                }
            }
        );

        document.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key === "Escape" &&
                    this.chatWindow.classList.contains(
                        "is-open"
                    )
                ) {
                    this._closeChat();
                }
            }
        );
    }
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        window._supportChat = new SupportChat();
    }
);