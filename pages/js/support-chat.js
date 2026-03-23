function bindSupportChat() {
    const toggleButton = document.getElementById("support-toggle");
    const closeButton = document.getElementById("support-close");
    const chatWindow = document.getElementById("support-chat-window");
    const form = document.getElementById("support-form");
    const input = document.getElementById("support-input");
    const messages = document.getElementById("support-messages");

    if (!toggleButton || !closeButton || !chatWindow || !form || !input || !messages) {
        return;
    }

    const openChat = () => {
        chatWindow.classList.add("is-open");
        chatWindow.setAttribute("aria-hidden", "false");
        toggleButton.setAttribute("aria-expanded", "true");
        input.focus();
    };

    const closeChat = () => {
        chatWindow.classList.remove("is-open");
        chatWindow.setAttribute("aria-hidden", "true");
        toggleButton.setAttribute("aria-expanded", "false");
    };

    const appendUserMessage = (text) => {
        const wrapper = document.createElement("article");
        wrapper.className = "support-msg support-msg-user";
        wrapper.innerHTML = `<p>${text}</p>`;
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
    };

    toggleButton.addEventListener("click", () => {
        if (chatWindow.classList.contains("is-open")) {
            closeChat();
            return;
        }

        openChat();
    });

    closeButton.addEventListener("click", closeChat);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = input.value.trim();
        if (!value) {
            return;
        }

        appendUserMessage(value);
        input.value = "";
        input.focus();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    bindSupportChat();
});
