(function () {
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
            promo: true,
            desc: "Replique AEG incontournable du champ de bataille. Receveur en metal, crosse RIS pour accessoires, moteur haute torque. Ideale pour les parties CQB et foret.",
            specs: [["Systeme", "AEG (Electrique)"], ["Energie", "1.0 a 1.2 joule"], ["Cadence", "~ 20 billes/sec"], ["Chargeur", "300 billes HI-CAP"], ["Longueur", "700 / 830 mm"], ["Poids", "2.9 kg"], ["Compatibilite", "Billes 6mm 0.20-0.28g"]]
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
            promo: true,
            desc: "Pistolet a gaz blowback ultra-realiste. Action de recul authentique, culasse metal, poignee ergonomique Gen5. Parfait comme sidearm.",
            specs: [["Systeme", "GBB (Gaz)"], ["Energie", "~1.0 joule"], ["Cadence", "Semi-auto"], ["Chargeur", "24 billes"], ["Longueur", "202 mm"], ["Poids", "760 g"], ["Gaz", "Green Gas / CO2"]]
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
            promo: false,
            desc: "Sniper bolt-action de reference. Canon interne long pour precision maximale, bipied integre, crosse ajustable.",
            specs: [["Systeme", "Spring (Manuel)"], ["Energie", "1.8 a 2.0 joule"], ["Canon interne", "430 mm"], ["Chargeur", "30 billes"], ["Longueur", "1170 mm"], ["Poids", "3.8 kg"], ["Billes recommandees", "0.28 a 0.40g"]]
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
            promo: false,
            desc: "Casque FAST type forces speciales. Coque ABS renforcee, mousse interieure amovible, rails lateraux NVG.",
            specs: [["Matiere", "ABS renforce"], ["Taille", "Unique (ajustable)"], ["Rails", "Lateraux ARC + Top"], ["Couleur", "Multicam / OD Green"], ["Compatibilite", "Lunettes NVG"], ["Poids", "680 g"]]
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
            promo: false,
            desc: "AK105 compacte tout metal, bois lamelle authentique. Moteur long haute vitesse.",
            specs: [["Systeme", "AEG (Electrique)"], ["Energie", "~1.1 joule"], ["Cadence", "~ 18 billes/sec"], ["Chargeur", "600 billes HI-CAP"], ["Longueur", "700 / 890 mm"], ["Poids", "3.2 kg"]]
        },
        {
            id: 5,
            name: "MP5 SD3 SILENCIE",
            category: "AEG",
            type: "aeg",
            price: 245,
            oldPrice: 280,
            rating: 5,
            reviews: 99,
            tag: null,
            promo: true,
            desc: "MP5 compacte avec silencieux integre, parfaite pour le CQB. Crosse filaire, selecteur de tir, chargeur 200 billes.",
            specs: [["Systeme", "AEG"], ["Energie", "0.9 joule"], ["Longueur", "720 mm"], ["Chargeur", "200 billes"], ["Poids", "2.5 kg"]]
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
            promo: true,
            desc: "Plate Carrier tactique en cordura 500D. 8 poches MOLLE, poche hydratation, bretelles reglables.",
            specs: [["Matiere", "Cordura 500D"], ["Systeme", "MOLLE"], ["Couleur", "Multicam"], ["Taille", "S/M/L/XL"], ["Poids", "1.2 kg"]]
        },
        {
            id: 7,
            name: "M870 SHOTGUN SPRING",
            category: "Autre",
            type: "gbb",
            price: 119,
            oldPrice: null,
            rating: 4,
            reviews: 62,
            tag: null,
            promo: false,
            desc: "Replique pompe M870. Tir tri-shot, crosse pliante, chargeur tube de 30 billes.",
            specs: [["Systeme", "Spring (Manuel)"], ["Type de tir", "Tri-shot (3 billes)"], ["Chargeur", "30 billes"], ["Longueur", "790 mm"], ["Poids", "1.8 kg"]]
        }
    ];

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

    window.CATALOG_PRODUCTS = products;
    window.getCatalogSvg = getSvgForProduct;
})();
