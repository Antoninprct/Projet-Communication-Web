let products = [];

let currentFilter = "all";
let currentSearch = "";

function getApiBaseUrl() {
    const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";
    return `${basePath}/backend/index.php/api`;
}

function formatPrice(product) {
    const currentPrice = Number(product.price || 0).toFixed(2);
    const oldPriceHtml = product.oldPrice ? `<span class="product-price-old">${Number(product.oldPrice).toFixed(2)} EUR</span>` : "";
    return `<span class="product-price">${currentPrice} EUR</span>${oldPriceHtml}`;
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
    if (!grid) {
        return;
    }

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
            <div class="product-img-wrap" onclick="window.location.href='${basePath}/index.php?page=product&id=${product.id}'">
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

    if (!searchInput || !grid || filterButtons.length === 0) {
        return;
    }

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

async function loadProducts() {
    const grid = document.getElementById("products-grid");
    if (!grid) {
        return;
    }

    grid.innerHTML = '<div class="col-12"><div class="empty-state">// CHARGEMENT DES PRODUITS... //</div></div>';

    try {
        products = await window.CatalogApi.fetchProducts();
        renderProducts();
    } catch (error) {
        grid.innerHTML = '<div class="col-12"><div class="empty-state">// API INDISPONIBLE //</div></div>';
        console.error("Failed to load products:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    loadProducts();

    // ADMIN: Ajouter un produit
    const addProductForm = document.getElementById("addProductForm");
    if (addProductForm) {
        addProductForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nom = document.getElementById('p-nom').value;
            const desc = document.getElementById('p-desc').value;
            const prix = parseFloat(document.getElementById('p-prix').value);
            const oldPrice = document.getElementById('p-old-price').value ? parseFloat(document.getElementById('p-old-price').value) : null;
            const imageUrl = document.getElementById('p-image').value;
            const cat = document.getElementById('p-cat').value;

            const payload = {
                nom: nom,
                description: desc,
                prix: prix,
                old_price: oldPrice,
                image_url: imageUrl,
                category: cat
            };

            try {
                const response = await fetch(`${getApiBaseUrl()}/products/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    showToast("PRODUIT AJOUTE !", "bi bi-check2-circle");
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
                    modal.hide();
                    addProductForm.reset();
                    loadProducts();
                } else {
                    showToast("ERREUR AJOUT (Admin requis ?)", "bi bi-x-circle");
                }
            } catch (e) {
                console.error(e);
                showToast("ERREUR RESEAU", "bi bi-x-circle");
            }
        });
    }
});
