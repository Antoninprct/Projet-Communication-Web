(function () {

    function getSvgForProduct(product) {
        const svgs = [
            '<svg viewBox="0 0 200 120"...></svg>',
            '<svg viewBox="0 0 200 120"...></svg>'
        ];
        return svgs[product.id % svgs.length];
    }

    window.getCatalogSvg = getSvgForProduct;

    function inferType(rawType, category) {
        if (typeof rawType === "string" && rawType.trim() !== "") {
            return rawType.toLowerCase();
        }

        const normalizedCategory = (category || "").toLowerCase();
        if (normalizedCategory.includes("aeg")) return "aeg";
        if (normalizedCategory.includes("pistolet") || normalizedCategory.includes("gbb")) return "gbb";
        if (normalizedCategory.includes("sniper") || normalizedCategory.includes("precision")) return "sniper";
        if (normalizedCategory.includes("equip")) return "gear";

        return "other";
    }

    function normalizeProduct(raw) {
        const avgRating = raw.avg_rating !== null && raw.avg_rating !== undefined ? Number(raw.avg_rating) : null;
        const rating = Math.max(0, Math.min(5, Math.round(avgRating ?? Number(raw.rating ?? 0))));
        const reviewsCount = Number(raw.reviews_count ?? 0);
        const price = Number(raw.prix ?? 0);
        const oldPrice = raw.old_price !== null && raw.old_price !== undefined ? Number(raw.old_price) : null;
        const stock = Number(raw.stock ?? 0);
        const type = inferType(raw.type, raw.category);

        return {
            id: Number(raw.id),
            name: String(raw.nom ?? "Produit"),
            category: String(raw.category ?? "Autre"),
            type,
            price,
            oldPrice,
            rating,
            avgRating,
            reviews: reviewsCount,
            reviewsList: Array.isArray(raw.reviews)
                ? raw.reviews.map((review) => ({
                    id: Number(review.id ?? 0),
                    note: Number(review.note ?? 0),
                    commentaire: String(review.commentaire ?? ""),
                    auteur: String(review.auteur ?? "Anonyme"),
                    created_at: String(review.created_at ?? "")
                }))
                : [],
            tag: raw.tag ? String(raw.tag) : null,
            promo: Boolean(raw.promo),
            desc: String(raw.description ?? "Description indisponible."),
            stock,
            specs: [
                ["Categorie", String(raw.category ?? "Autre")],
                ["Type", type.toUpperCase()],
                ["Stock", stock > 0 ? String(stock) : "Rupture"],
                ["Note moyenne", avgRating !== null ? `${avgRating.toFixed(1)}/5` : "Non note"]
            ]
        };
    }

    function getBasePath() {
        return window.APP_BASE_PATH && window.APP_BASE_PATH !== "/" ? window.APP_BASE_PATH : "";
    }

    function buildProductsUrl(pathSuffix) {
        const basePath = getBasePath();
        return `${basePath}/backend/index.php/api/products${pathSuffix}`;
    }

    function buildReviewsUrl(productId) {
        const basePath = getBasePath();
        const id = Number(productId);
        return `${basePath}/backend/index.php/api/reviews/?id=${encodeURIComponent(String(id))}`;
    }

    // 🔥 NOUVEAU : URL POST avis
    function buildAddReviewUrl() {
        const basePath = getBasePath();
        return `${basePath}/backend/index.php/api/reviews`;
    }

    async function fetchJson(url) {
        const response = await fetch(url, {
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        return response.json();
    }

    async function fetchProducts() {
        const payload = await fetchJson(buildProductsUrl("/"));
        if (!payload || !payload.success || !Array.isArray(payload.data)) {
            throw new Error("Invalid API payload");
        }

        return payload.data.map(normalizeProduct);
    }

    async function fetchProductById(productId) {
        const id = Number(productId);
        const payload = await fetchJson(buildProductsUrl(`/${id}`));
        if (!payload || !payload.success || !payload.data) {
            throw new Error("Invalid API payload");
        }

        return normalizeProduct(payload.data);
    }

    async function fetchReviewsByProductId(productId) {
        const id = Number(productId);
        const payload = await fetchJson(buildReviewsUrl(id));
        if (!payload || !payload.success || !Array.isArray(payload.data)) {
            throw new Error("Invalid reviews payload");
        }

        return payload.data.map((review) => ({
            id: Number(review.id ?? 0),
            note: Number(review.note ?? 0),
            commentaire: String(review.commentaire ?? ""),
            auteur: String(review.auteur ?? "Anonyme"),
            created_at: String(review.created_at ?? "")
        }));
    }

    // 🔥 NOUVEAU : envoyer avis
    async function addReview(data) {
        const response = await fetch(buildAddReviewUrl(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Failed to add review");
        }

        return response.json();
    }

    window.CatalogApi = {
        fetchProducts,
        fetchProductById,
        fetchReviewsByProductId,
        addReview, // 🔥 ajouté ici
        normalizeProduct
    };

})();