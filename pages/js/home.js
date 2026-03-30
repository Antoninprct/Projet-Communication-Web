async function renderFeaturedProducts() {
  const host = document.getElementById("featured-products");
  if (!host || !window.CatalogApi) {
    return;
  }

  host.innerHTML = '<div class="col-12"><div class="empty-state">// CHARGEMENT DES PRODUITS... //</div></div>';

  let featured = [];
  try {
    window.CATALOG_PRODUCTS = await window.CatalogApi.fetchProducts();
    featured = window.CATALOG_PRODUCTS.slice(0, 4);
  } catch (error) {
    host.innerHTML = '<div class="col-12"><div class="empty-state">// API INDISPONIBLE //</div></div>';
    console.error("Failed to load featured products:", error);
    return;
  }

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
            <div class="price">${Number(product.price || 0).toFixed(2)} EUR</div>
              <a class="btn-outline-tactical mt-2 d-inline-block" href="${basePath}/index.php?page=product&id=${product.id}">Voir detail</a>
          </div>
        </article>
      </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
});
