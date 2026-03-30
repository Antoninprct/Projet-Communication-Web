const products = window.CATALOG_PRODUCTS || [];

let currentFilter = "all";
let currentSearch = "";

function formatPrice(product) {
    const oldPriceHtml = product.oldPrice ? `<span class="product-price-old">${product.oldPrice}EUR</span>` : "";
    return `<span class="product-price">${product.price}EUR</span>${oldPriceHtml}`;
}

function getFilteredProducts() {
    return products.filter((product) => {
        const matchFilter = currentFilter === "all" || (currentFilter === "promo" ? product.promo : product.type === currentFilter);
        const searchValue = currentSearch.toLowerCase();
        const matchSearch = product.name.toLowerCase().includes(searchValue) || product.category.toLowerCase().includes(searchValue);
        return matchFilter && matchSearch;
    });
}

// Grille des produits

function renderProducts() {
    const grid = document.getElementById("products-grid");
    const filteredProducts = getFilteredProducts();
    const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div class="col-12"><div class="empty-state">// AUCUN PRODUIT TROUVE //</div></div>';
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
            <div class="product-img-wrap">
              <div class="prod-svg-bg">${window.getCatalogSvg(product)}</div>
              <div class="product-img-overlay">VUE RAPIDE</div>
              ${productTag}
            </div>
            <div class="product-body">
              <div class="product-category">${product.category}</div>
              <h2 class="product-name">${product.name}</h2>
              <div class="product-rating">${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)} <span>(${product.reviews} avis)</span></div>
              <div>${formatPrice(product)}</div>
            </div>
            <div class="product-footer">
              <button class="btn-add-cart" data-action="add-cart" type="button">
                <i class="bi bi-bag-plus me-1"></i>Ajouter
              </button>
                                                        <a class="btn-detail text-decoration-none" href="${basePath}/index.php?page=product&id=${product.id}">Details</a>
            </div>
          </article>
        </div>
      `;
        })
        .join("");
}

// Notifications 
function showToast(message, iconClass) {
    const toast = document.getElementById("toast-cart");
    toast.innerHTML = `<i class="${iconClass} me-2"></i>${message}`;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(80px)";
    }, 2200);
}

// événements boutons
function bindEvents() {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const grid = document.getElementById("products-grid");

    searchInput.addEventListener("input", (event) => {
        currentSearch = event.target.value;
        renderProducts();
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            renderProducts();
        });
    });

    grid.addEventListener("click", (event) => {
        const target = event.target.closest("button");
        if (!target) {
            return;
        }

        if (target.dataset.action === "add-cart") {
            showToast("AJOUTE AU PANIER", "bi bi-check2-circle");
        }

    });
}

document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    renderProducts();
});
