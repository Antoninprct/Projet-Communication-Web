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

document.addEventListener("DOMContentLoaded", () => {
    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");

    tabLogin.addEventListener("click", () => toggleAuthMode("login"));
    tabRegister.addEventListener("click", () => toggleAuthMode("register"));

    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        showToast("CONNEXION REUSSIE", "bi bi-person-check");
    });

    formRegister.addEventListener("submit", (event) => {
        event.preventDefault();
        showToast("COMPTE CREE", "bi bi-person-plus");
    });
});
