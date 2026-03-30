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

function getProductIdFromRoute() {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1] || "";

    if (/^\d+$/.test(lastPart)) {
        return Number(lastPart);
    }

    const searchParam = new URLSearchParams(window.location.search).get("id");
    if (searchParam && /^\d+$/.test(searchParam)) {
        return Number(searchParam);
    }

    return 0;
}

function renderRelated(currentProduct) {
    const host = document.getElementById("related-products");
    if (!host) {
        return;
    }
    const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";

    const related = window.CATALOG_PRODUCTS
        .filter((item) => item.id !== currentProduct.id && item.type === currentProduct.type)
        .slice(0, 4);

    host.innerHTML = related.map((item) => `
      <div class="col-6 col-lg-3">
        <article class="related-card">
          <div class="prod-svg-bg mb-2">${window.getCatalogSvg(item)}</div>
          <h3>${item.name}</h3>
                                        <a href="${basePath}/index.php?page=product&id=${item.id}">Voir ce produit</a>
        </article>
      </div>
    `).join("");
}

function renderProductDetail() {
    if (!window.CATALOG_PRODUCTS) {
        return;
    }

    const productId = getProductIdFromRoute();
    const product = window.CATALOG_PRODUCTS.find((item) => item.id === productId) || window.CATALOG_PRODUCTS[0];

    document.getElementById("detail-breadcrumb").textContent = product.name;
    document.getElementById("detail-category").textContent = product.category;
    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-rating").innerHTML = `${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)} <span>(${product.reviews} avis)</span>`;
    document.getElementById("detail-price").textContent = `${product.price}EUR`;
    document.getElementById("detail-price-old").textContent = product.oldPrice ? `${product.oldPrice}EUR` : "";
    document.getElementById("detail-desc").textContent = product.desc;
    document.getElementById("detail-img-box").innerHTML = `<div class="prod-svg-bg w-100 h-100">${window.getCatalogSvg(product)}</div>`;
    document.getElementById("detail-tags").innerHTML = `${product.tag ? `<span class="tag-tactical green">${product.tag}</span>` : ""}<span class="tag-tactical">EN STOCK</span>`;
    document.getElementById("detail-specs").innerHTML = product.specs.map((line) => `<tr><td>${line[0]}</td><td>${line[1]}</td></tr>`).join("");

    renderRelated(product);
}

document.addEventListener("DOMContentLoaded", () => {
    renderProductDetail();

    const addButton = document.getElementById("detail-add-cart");
    if (addButton) {
        addButton.addEventListener("click", () => {
            showToast("AJOUTE AU PANIER", "bi bi-check2-circle");
        });
    }
});
