const products = [
    {
        id: 0,
        name: "M4A1 CARBINE RIS",
        category: "AEG",
        type: "aeg",
        price: 289,
        oldPrice: 349,
        rating: 5,
        reviews: 128,
        tag: "TOP VENTE",
        promo: true
    },
    {
        id: 1,
        name: "G17 GEN5 GBB",
        category: "Pistolet GBB",
        type: "gbb",
        price: 159,
        oldPrice: 199,
        rating: 4,
        reviews: 87,
        tag: "-20%",
        promo: true
    },
    {
        id: 2,
        name: "VSR-10 SNIPER",
        category: "Fusil de precision",
        type: "sniper",
        price: 399,
        oldPrice: null,
        rating: 5,
        reviews: 53,
        tag: "NOUVEAU",
        promo: false
    },
    {
        id: 3,
        name: "CASQUE FAST CAMO",
        category: "Equipement",
        type: "gear",
        price: 89,
        oldPrice: null,
        rating: 4,
        reviews: 214,
        tag: null,
        promo: false
    },
    {
        id: 4,
        name: "AK-105 FULL METAL",
        category: "AEG",
        type: "aeg",
        price: 319,
        oldPrice: null,
        rating: 4,
        reviews: 41,
        tag: "STOCK LIMITE",
        promo: false
    },
    {
        id: 6,
        name: "GILET PLATE CARRIER",
        category: "Equipement",
        type: "gear",
        price: 129,
        oldPrice: 159,
        rating: 4,
        reviews: 178,
        tag: "PROMO",
        promo: true
    }

];

let currentFilter = "all";
let currentSearch = "";

// Test SVGs
function getSvgForProduct(product) {
    const svgs = [
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="50" width="140" height="18" rx="2" fill="#4a5240"/><rect x="140" y="45" width="35" height="28" rx="2" fill="#3a3d30"/><rect x="10" y="52" width="20" height="14" rx="1" fill="#3d4038"/><rect x="60" y="42" width="80" height="10" rx="1" fill="#5c6058"/><rect x="75" y="68" width="30" height="20" rx="2" fill="#2a2d25"/><circle cx="90" cy="78" r="4" fill="#1a1d18"/></svg>',
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="52" width="100" height="16" rx="2" fill="#4a5240"/><rect x="125" y="48" width="30" height="24" rx="2" fill="#3a3d30"/><rect x="30" y="54" width="15" height="12" rx="1" fill="#3d4038"/><rect x="65" y="44" width="55" height="9" rx="1" fill="#5c6058"/><rect x="72" y="68" width="22" height="18" rx="2" fill="#2a2d25"/></svg>',
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="48" width="150" height="20" rx="2" fill="#4a5240"/><rect x="160" y="42" width="15" height="32" rx="1" fill="#2a2d25"/><rect x="15" y="50" width="15" height="16" rx="1" fill="#3d4038"/><rect x="70" y="38" width="90" height="11" rx="1" fill="#5c6058"/><rect x="85" y="68" width="30" height="18" rx="2" fill="#2a2d25"/></svg>',
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><path d="M30 60 Q50 40 90 45 L130 43 Q160 42 165 60 Q160 78 130 77 L90 75 Q50 80 30 60Z" fill="#4a5240"/><circle cx="170" cy="60" r="12" fill="#3d4038"/><circle cx="30" cy="60" r="10" fill="#3d4038"/></svg>',
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="48" width="145" height="22" rx="2" fill="#3d4038"/><rect x="145" y="42" width="30" height="34" rx="2" fill="#4a5240"/><rect x="10" y="50" width="18" height="18" rx="1" fill="#2a2d25"/><rect x="55" y="40" width="85" height="9" rx="1" fill="#5c6058"/></svg>',
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="52" width="120" height="16" rx="1" fill="#4a5240"/><rect x="140" y="46" width="30" height="28" rx="1" fill="#2a2d25"/><rect x="5" y="50" width="28" height="20" rx="2" fill="#5c6058" opacity="0.7"/><rect x="68" y="44" width="65" height="9" rx="1" fill="#5c6058"/></svg>',
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><path d="M20 40 L180 40 L180 80 L20 80 Z" fill="#4a5240" opacity="0.7"/><rect x="35" y="50" width="130" height="20" rx="1" fill="#3d4038"/><rect x="55" y="40" width="20" height="40" rx="1" fill="#5c6058" opacity="0.4"/><rect x="90" y="40" width="20" height="40" rx="1" fill="#5c6058" opacity="0.4"/></svg>',
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="50" width="105" height="20" rx="2" fill="#4a5240"/><rect x="120" y="44" width="15" height="32" rx="1" fill="#3d4038"/><rect x="20" y="52" width="18" height="16" rx="1" fill="#5c6058"/><rect x="60" y="42" width="55" height="9" rx="1" fill="#5c6058"/></svg>'
    ];

    return svgs[product.id % svgs.length];
}

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

// Render products in the grid

function renderProducts() {
    const grid = document.getElementById("products-grid");
    const filteredProducts = getFilteredProducts();

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
              <div class="prod-svg-bg">${getSvgForProduct(product)}</div>
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
              <button class="btn-detail" data-action="details" type="button">Details</button>
            </div>
          </article>
        </div>
      `;
        })
        .join("");
}

// Show notification toast
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

// Add events to buttons
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

        if (target.dataset.action === "details") {
            showToast("PAGE DETAIL A CONNECTER", "bi bi-info-circle");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    renderProducts();
});
