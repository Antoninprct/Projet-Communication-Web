let products = [];

let currentFilter = "all";
let currentSearch = "";

// =======================
// FORMAT PRIX
// =======================
function formatPrice(product) {
    const currentPrice = Number(product.price || 0).toFixed(2);
    const oldPriceHtml = product.oldPrice
        ? `<span class="product-price-old">${Number(product.oldPrice).toFixed(2)} EUR</span>`
        : "";

    return `<span class="product-price">${currentPrice} EUR</span>${oldPriceHtml}`;
}

// =======================
// FILTRAGE
// =======================
function getFilteredProducts() {
    return products.filter((product) => {
        const matchFilter =
            currentFilter === "all" ||
            (currentFilter === "promo"
                ? product.promo
                : product.type === currentFilter);

        const searchValue = currentSearch.toLowerCase();

        const matchSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue);

        return matchFilter && matchSearch;
    });
}

// =======================
// RENDER PRODUITS
// =======================
function renderProducts() {
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    const filteredProducts = getFilteredProducts();
    const basePath =
        window.APP_BASE_PATH && window.APP_BASE_PATH !== "/"
            ? window.APP_BASE_PATH
            : "";

    if (filteredProducts.length === 0) {
        grid.innerHTML =
            '<div class="col-12"><div class="empty-state">// AUCUN PRODUIT TROUVE //</div></div>';
        return;
    }

    grid.innerHTML = filteredProducts
        .map((product) => {
            const productTag = product.tag
                ? `<span class="product-tag${product.promo ? " promo" : ""}">${product.tag}</span>`
                : "";

            return `
        <div class="col-md-6 col-lg-4 col-xl-3">
          <article class="product-card" aria-label="Produit ${product.name}">
            
            <div class="product-img-wrap" onclick="window.location.href='${basePath}/index.php?page=product&id=${product.id}'">
              <div class="prod-svg-bg">${window.getCatalogSvg(product)}</div>
              <div class="product-img-overlay">VUE RAPIDE</div>
              ${productTag}
            </div>

            <div class="product-body">
              <div class="product-category">${product.category}</div>
              <h2 class="product-name">${product.name}</h2>

              <div class="product-rating">
                ${"★".repeat(product.rating)}
                ${"☆".repeat(5 - product.rating)}
                <span>(${product.reviews} avis)</span>
              </div>

              <div>${formatPrice(product)}</div>
            </div>

            <div class="product-footer">
              <button class="btn-add-cart" data-action="add-cart" type="button">
                <i class="bi bi-bag-plus me-1"></i>Ajouter
              </button>

              <a class="btn-detail text-decoration-none"
                 href="${basePath}/index.php?page=product&id=${product.id}">
                 Details
              </a>
            </div>

          </article>
        </div>
      `;
        })
        .join("");
}

// =======================
// 🔄 REFRESH AUTO
// =======================
async function refreshUI() {
    try {
        products = await window.CatalogApi.fetchProducts();
        renderProducts();
    } catch (error) {
        console.error("Refresh failed:", error);
    }
}

// =======================
// TOAST
// =======================
function showToast(message, iconClass) {
    const toast = document.getElementById("toast-cart");
    if (!toast) return;

    toast.innerHTML = `<i class="${iconClass} me-2"></i>${message}`;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(80px)";
    }, 2200);
}

// =======================
// EVENTS
// =======================
function bindEvents() {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const grid = document.getElementById("products-grid");

    if (!searchInput || !grid || filterButtons.length === 0) return;

    // 🔍 recherche
    searchInput.addEventListener("input", (event) => {
        currentSearch = event.target.value;
        renderProducts();
    });

    // 🎯 filtres
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;

            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            renderProducts();
        });
    });

    // 🛒 actions produits
    grid.addEventListener("click", async (event) => {
        const target = event.target.closest("button");
        if (!target) return;

        if (target.dataset.action === "add-cart") {
            showToast("AJOUTE AU PANIER", "bi bi-check2-circle");

            // 🔥 REFRESH AUTO APRES ACTION
            await refreshUI();
        }
    });
}

// =======================
// LOAD PRODUITS
// =======================
async function loadProducts() {
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    grid.innerHTML =
        '<div class="col-12"><div class="empty-state">// CHARGEMENT DES PRODUITS... //</div></div>';

    try {
        products = await window.CatalogApi.fetchProducts();
        renderProducts();
    } catch (error) {
        grid.innerHTML =
            '<div class="col-12"><div class="empty-state">// API INDISPONIBLE //</div></div>';

        console.error("Failed to load products:", error);
    }
}

// =======================
// INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    loadProducts();
});