function showToast(message, iconClass) {
    const toast = document.getElementById("toast-cart");
    if (!toast) {
        return;
    }

    toast.innerHTML = `<i class="${iconClass} me-2"></i>${message}`;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(80px)";
    }, 2200);
}

function toggleAuthMode(mode) {
    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");

    const isLogin = mode === "login";

    tabLogin.classList.toggle("active", isLogin);
    tabRegister.classList.toggle("active", !isLogin);
    formLogin.classList.toggle("d-none", !isLogin);
    formRegister.classList.toggle("d-none", isLogin);
}

function getApiBaseUrl() {
    const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";
    return `${basePath}/backend/index.php/api`;
}

function loadAuthState() {
    if (window.AUTH_TOKEN && window.AUTH_ROLE) {
        return;
    }

    try {
        const raw = localStorage.getItem("bawbaw.auth");
        if (!raw) {
            return;
        }
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.token === "string") {
            window.AUTH_TOKEN = parsed.token;
            window.AUTH_ROLE = parsed.role || null;
            window.AUTH_USER = parsed.user || null;
        }
    } catch (error) {
    }
}

function saveAuthState(payload) {
    window.AUTH_TOKEN = payload.token;
    window.AUTH_ROLE = payload.role;
    window.AUTH_USER = payload.user;

    localStorage.setItem("bawbaw.auth", JSON.stringify({
        token: payload.token,
        role: payload.role,
        user: payload.user
    }));
}

async function submitAuth(action, payload) {
    const response = await fetch(`${getApiBaseUrl()}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            action,
            ...payload
        })
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data || !data.success) {
        const message = data && data.message ? data.message : `Erreur (${response.status})`;
        throw new Error(message);
    }

    return data;
}

document.addEventListener("DOMContentLoaded", () => {
    loadAuthState();

    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");

    tabLogin.addEventListener("click", () => toggleAuthMode("login"));
    tabRegister.addEventListener("click", () => toggleAuthMode("register"));

    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        submitAuth("login", { email, password })
            .then((payload) => {
                saveAuthState(payload);
                showToast("CONNEXION REUSSIE", "bi bi-person-check");
                const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";
                setTimeout(() => {
                    window.location.href = `${basePath}/index.php?page=home`;
                }, 700);
            })
            .catch((error) => {
                showToast(error.message.toUpperCase(), "bi bi-x-circle");
            });
    });

    formRegister.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;

        submitAuth("register", { name, email, password })
            .then((payload) => {
                saveAuthState(payload);
                showToast("COMPTE CREE", "bi bi-person-plus");
                const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";
                setTimeout(() => {
                    window.location.href = `${basePath}/index.php?page=home`;
                }, 700);
            })
            .catch((error) => {
                showToast(error.message.toUpperCase(), "bi bi-x-circle");
            });
    });
});
