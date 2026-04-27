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

function getApiBaseUrl() {
    const basePath = window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";
    return `${basePath}/backend/index.php/api`;
}

async function extractApiErrorMessage(response) {
    try {
        const payload = await response.json();
        if (payload && typeof payload.message === "string" && payload.message.trim() !== "") {
            return payload.message;
        }
    } catch (error) {
        // Ignore JSON parse errors and fallback to generic text.
    }

    return `Erreur API (${response.status})`;
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

    const related = (window.CATALOG_PRODUCTS || [])
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

function renderReviews(product) {
    const host = document.getElementById("detail-reviews");
    if (!host) {
        return;
    }

    const reviews = Array.isArray(product.reviewsList) ? product.reviewsList : [];
    if (reviews.length === 0) {
        host.innerHTML = '<div class="review-empty">Aucun avis pour le moment.</div>';
        return;
    }

    host.innerHTML = reviews.map((review) => {
        const note = Math.max(0, Math.min(5, Math.round(Number(review.note || 0))));
        return `
      <article class="review-card">
        <div class="review-head">
          <strong>${review.auteur || "Anonyme"}</strong>
          <span>${"★".repeat(note)}${"☆".repeat(5 - note)}</span>
        </div>
        <p>${review.commentaire || "Sans commentaire."}</p>
      </article>
    `;
    }).join("");
}

async function renderProductDetail() {
    if (!window.CatalogApi) {
        return;
    }

    const productId = getProductIdFromRoute();
    const detailName = document.getElementById("detail-name");
    if (detailName) {
        detailName.textContent = "Chargement...";
    }

    let product = null;

    try {
        window.CATALOG_PRODUCTS = await window.CatalogApi.fetchProducts();

        if (productId > 0) {
            product = await window.CatalogApi.fetchProductById(productId);
        } else {
            product = window.CATALOG_PRODUCTS[0] || null;
        }

        if (!product && productId > 0) {
            product = window.CATALOG_PRODUCTS.find((item) => item.id === productId) || null;
        }

        if (product && product.id > 0) {
            try {
                product.reviewsList = await window.CatalogApi.fetchReviewsByProductId(product.id);
                product.reviews = product.reviewsList.length;
            } catch (reviewsError) {
                console.error("Failed to load reviews:", reviewsError);
                product.reviewsList = [];
            }
        }
    } catch (error) {
        console.error("Failed to load product detail:", error);
    }

    if (!product) {
        if (detailName) {
            detailName.textContent = "Produit introuvable";
        }
        return;
    }

    document.getElementById("detail-breadcrumb").textContent = product.name;
    document.getElementById("detail-category").textContent = product.category;
    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-rating").innerHTML = `${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)} <span>(${product.reviews} avis)</span>`;
    document.getElementById("detail-price").textContent = `${Number(product.price || 0).toFixed(2)} EUR`;
    document.getElementById("detail-price-old").textContent = product.oldPrice ? `${Number(product.oldPrice).toFixed(2)} EUR` : "";
    document.getElementById("detail-desc").textContent = product.desc;
    document.getElementById("detail-img-box").innerHTML = `<div class="prod-svg-bg w-100 h-100">${window.getCatalogSvg(product)}</div>`;
    document.getElementById("detail-tags").innerHTML = `${product.tag ? `<span class="tag-tactical green">${product.tag}</span>` : ""}<span class="tag-tactical">${product.stock > 0 ? "EN STOCK" : "RUPTURE"}</span>`;
    document.getElementById("detail-specs").innerHTML = product.specs.map((line) => `<tr><td>${line[0]}</td><td>${line[1]}</td></tr>`).join("");

    window.CURRENT_PRODUCT = product;

    renderReviews(product);
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

    const btnDelete = document.getElementById("btn-delete-product");
    const confirmDeleteModalEl = document.getElementById("confirmDeleteModal");
    const confirmDeleteBtn = document.getElementById("confirm-delete-product");
    if (btnDelete) {
        btnDelete.addEventListener("click", () => {
            if (!confirmDeleteModalEl) {
                showToast("MODALE DE CONFIRMATION INDISPONIBLE", "bi bi-exclamation-triangle");
                return;
            }

            const deleteModal = bootstrap.Modal.getOrCreateInstance(confirmDeleteModalEl);
            deleteModal.show();
        });
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", async () => {
            const id = getProductIdFromRoute();
            const originalText = confirmDeleteBtn.innerHTML;
            confirmDeleteBtn.disabled = true;
            confirmDeleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Suppression...';

            try {
                const res = await fetch(`${getApiBaseUrl()}/products/${id}`, { method: "DELETE" });
                if (res.ok) {
                    if (confirmDeleteModalEl) {
                        const deleteModal = bootstrap.Modal.getOrCreateInstance(confirmDeleteModalEl);
                        deleteModal.hide();
                    }
                    showToast("PRODUIT SUPPRIME", "bi bi-check2-circle");
                    setTimeout(() => {
                        window.location.href = `${window.APP_BASE_PATH}/index.php?page=products`;
                    }, 700);
                } else {
                    const message = await extractApiErrorMessage(res);
                    showToast(message.toUpperCase(), "bi bi-x-circle");
                }
            } catch (error) {
                showToast("ERREUR RESEAU", "bi bi-x-circle");
            } finally {
                confirmDeleteBtn.disabled = false;
                confirmDeleteBtn.innerHTML = originalText;
            }
        });
    }

    const btnEdit = document.getElementById("btn-edit-product");
    if (btnEdit) {
        btnEdit.addEventListener("click", () => {
            const p = window.CURRENT_PRODUCT;
            if (!p) return;

            document.getElementById("ep-nom").value = p.name || "";
            document.getElementById("ep-desc").value = p.desc || "";
            document.getElementById("ep-prix").value = p.price || 0;
            document.getElementById("ep-old-price").value = p.oldPrice || "";
            document.getElementById("ep-image").value = p.imageUrl || "";

            const catSelect = document.getElementById("ep-cat");
            if (catSelect) {
                const opts = Array.from(catSelect.options);
                const hasMatch = opts.some(opt => opt.value === p.category);
                if (hasMatch) catSelect.value = p.category;
            }
        });
    }

    const formEdit = document.getElementById("editProductForm");
    if (formEdit) {
        formEdit.addEventListener("submit", async (e) => {
            e.preventDefault();
            const p = window.CURRENT_PRODUCT;
            if (!p) return;

            const newNom = document.getElementById("ep-nom").value;
            const newDesc = document.getElementById("ep-desc").value;
            const newPrix = parseFloat(document.getElementById("ep-prix").value);
            const newOldPrice = document.getElementById("ep-old-price").value ? parseFloat(document.getElementById("ep-old-price").value) : null;
            const newImg = document.getElementById("ep-image").value;
            const newCat = document.getElementById("ep-cat").value;

            const payload = {
                nom: newNom,
                description: newDesc,
                prix: newPrix,
                image_url: newImg,
                old_price: newOldPrice,
                category: newCat
            };

            const id = p.id;
            try {
                const res = await fetch(`${getApiBaseUrl()}/products/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    const editModalEl = document.getElementById("editProductModal");
                    if (editModalEl) {
                        const editModal = bootstrap.Modal.getOrCreateInstance(editModalEl);
                        editModal.hide();
                    }

                    showToast("PRODUIT MODIFIE", "bi bi-check2-circle");
                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                } else {
                    const message = await extractApiErrorMessage(res);
                    showToast(message.toUpperCase(), "bi bi-x-circle");
                }
            } catch (error) {
                showToast("ERREUR RESEAU", "bi bi-x-circle");
            }
        });
    }
});

//chagement
// === EXISTANT (ton code) ===
// ... je garde tout ton code intact ...

// 🔥 AJOUT AVIS
async function submitReview(productId) {
    const name = document.getElementById("review-name").value;
    const comment = document.getElementById("review-comment").value;
    const note = document.getElementById("review-note").value;

    if (!name || !comment || !note) {
        showToast("REMPLIS TOUS LES CHAMPS", "bi bi-exclamation-circle");
        return;
    }

    try {
        await window.CatalogApi.addReview({
            produit_id: productId,
            auteur: name,
            commentaire: comment,
            note: Number(note)
        });

        showToast("AVIS ENVOYE", "bi bi-check2-circle");

        // reload
        const reviews = await window.CatalogApi.fetchReviewsByProductId(productId);
        renderReviews({ reviewsList: reviews });

        // reset
        document.getElementById("review-name").value = "";
        document.getElementById("review-comment").value = "";
        document.getElementById("review-note").value = "";

    } catch (error) {
        console.error(error);
        showToast("ERREUR", "bi bi-x-circle");
    }
}

// === DOM READY ===
document.addEventListener("DOMContentLoaded", () => {
    renderProductDetail();

    const addButton = document.getElementById("detail-add-cart");
    if (addButton) {
        addButton.addEventListener("click", () => {
            showToast("AJOUTE AU PANIER", "bi bi-check2-circle");
        });
    }

    // 🔗 bouton avis
    const reviewBtn = document.getElementById("submit-review");
    if (reviewBtn) {
        const productId = getProductIdFromRoute();
        reviewBtn.addEventListener("click", () => {
            submitReview(productId);
        });
    }
});
