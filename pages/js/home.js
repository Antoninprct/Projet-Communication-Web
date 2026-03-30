function renderFeaturedProducts() {
    const host = document.getElementById("featured-products");
    if (!host || !window.CATALOG_PRODUCTS) {
        return;
    }

    const featured = window.CATALOG_PRODUCTS.slice(0, 4);

    const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";
    host.innerHTML = featured.map((product) => `
      <div class="col-md-6 col-lg-3">
        <article class="mini-product product-card">
          <div class="product-img-wrap">
            <div class="prod-svg-bg">${window.getCatalogSvg(product)}</div>
            <div class="product-img-overlay">VUE RAPIDE</div>
            ${product.tag ? `<span class="product-tag ${product.promo ? "promo" : ""}">${product.tag}</span>` : ""}
          </div>
          <div class="product-body">
            <div class="product-category">${product.category}</div>
            <h3>${product.name}</h3>
            <div class="product-rating">${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)} <span>(${product.reviews} avis)</span></div>
            <div class="price">${product.price}EUR</div>
              <a class="btn-outline-tactical mt-2 d-inline-block" href="${basePath}/index.php?page=product&id=${product.id}">Voir detail</a>
          </div>
        </article>
      </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    renderFeaturedProducts();
});
