(function () {

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

    window.CatalogApi = {
        fetchProducts,
        fetchProductById,
        fetchReviewsByProductId,
        normalizeProduct
    };
})();

