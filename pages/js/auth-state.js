(function () {
    function getStoredAuth() {
        try {
            const raw = localStorage.getItem("ghostops.auth");
            if (!raw) {
                return null;
            }
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.token === "string") {
                return parsed;
            }
        } catch (error) {
            return null;
        }

        return null;
    }

    function clearAuth() {
        localStorage.removeItem("ghostops.auth");
        window.AUTH_TOKEN = null;
        window.AUTH_ROLE = null;
        window.AUTH_USER = null;
    }

    function updateNav() {
        const auth = getStoredAuth();
        const authLink = document.getElementById("nav-auth-link");
        const authUser = document.getElementById("nav-auth-user");
        const authLogout = document.getElementById("nav-auth-logout");

        if (!auth || !auth.token) {
            if (authUser) authUser.classList.add("d-none");
            if (authLogout) authLogout.classList.add("d-none");
            if (authLink) {
                authLink.classList.remove("d-none");
                authLink.innerHTML = '<i class="bi bi-person-circle me-1"></i>Connexion';
            }
            return;
        }

        if (authLink) {
            authLink.classList.add("d-none");
        }

        if (authUser) {
            const name = auth.user && auth.user.name ? auth.user.name : "Operateur";
            const roleLabel = auth.role ? `(${auth.role})` : "";
            authUser.innerHTML = `<span class="nav-link-ghost">${name} ${roleLabel}</span>`;
            authUser.classList.remove("d-none");
        }

        if (authLogout) {
            authLogout.classList.remove("d-none");
            const button = authLogout.querySelector("button");
            if (button) {
                button.addEventListener("click", () => {
                    clearAuth();
                    const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";
                    window.location.href = `${basePath}/index.php?page=auth`;
                });
            }
        }
    }

    document.addEventListener("DOMContentLoaded", updateNav);
})();
