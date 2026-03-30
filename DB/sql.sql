-- =========================
-- TABLE USERS
-- =========================
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
);

CREATE INDEX IF NOT EXISTS idx_user_nom ON user(nom);

-- Utilisateurs
INSERT INTO user (nom, mot_de_passe, role) VALUES
('antoine', 'legoat', 'admin'),
('bob', 'hashed_password_2', 'client'),
('carol', 'hashed_password_3', 'client');

-- =========================
-- TABLE PRODUCTS
-- =========================
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    description TEXT,
    prix REAL NOT NULL DEFAULT 0.0,
    old_price REAL,
    stock INTEGER NOT NULL DEFAULT 0,
    category TEXT,
    type TEXT,
    rating INTEGER DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    tag TEXT,
    promo INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_products_nom ON products(nom);

-- =========================
-- AUTRE
-- Toutes les armes ne rentrant pas dans une catégorie précise
-- =========================
INSERT INTO products (nom, description, prix, stock, category) VALUES
('bazooka', 'pas au dessus de 2 joule par contre', 500.99, 1, 'Autre');

-- =========================
-- FUSILS D'ASSAUT
-- =========================
INSERT INTO products (nom, description, prix, stock, category) VALUES
('ak 47', 'tire tres fort', 299.99, 10, 'Fusil d''assaut'),
('f2000', 'Edouard', 199.99, 10, 'Fusil d''assaut'),
('famas', 'ça c un vrai', 2229.99, 50, 'Fusil d''assaut');

-- =========================
-- EQUIPEMENTS
-- Tout ce qui est accessoires / gear
-- =========================
INSERT INTO products (nom, description, prix, stock, category) VALUES
('armure bekam', 'full netherite', 199.99, 5, 'Equipement'),
('flashbang', 'fait mal aux yeux', 20, 50, 'Equipement');

-- =========================
-- PRODUITS FRONTEND : AEG
-- =========================
INSERT INTO products (nom, description, prix, old_price, stock, category, type, rating, tag, promo)
VALUES 
('M4A1 CARBINE RIS', '', 289, 349, 10, 'AEG', 'aeg', 5, 'TOP VENTE', 1),
('AK-105 FULL METAL', '', 319, NULL, 8, 'AEG', 'aeg', 4, 'STOCK LIMITE', 0);

-- =========================
-- PISTOLETS 
-- =========================
INSERT INTO products (nom, description, prix, old_price, stock, category, type, rating, tag, promo)
VALUES 
('G17 GEN5 GBB', '', 159, 199, 10, 'Pistolet GBB', 'gbb', 4, '-20%', 1);

-- =========================
-- SNIPERS
-- =========================
INSERT INTO products (nom, description, prix, old_price, stock, category, type, rating, tag, promo)
VALUES 
('VSR-10 SNIPER', '', 399, NULL, 5, 'Fusil de precision', 'sniper', 5, 'NOUVEAU', 0);

-- =========================
-- EQUIPEMENTS
-- =========================
INSERT INTO products (nom, description, prix, old_price, stock, category, type, rating, tag, promo)
VALUES 
('CASQUE FAST CAMO', '', 89, NULL, 20, 'Equipement', 'gear', 4, NULL, 0),
('GILET PLATE CARRIER', '', 129, 159, 15, 'Equipement', 'gear', 4, 'PROMO', 1);

-- =========================
-- TABLE REVIEWS
-- =========================
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    note INTEGER NOT NULL CHECK (note BETWEEN 1 AND 5),
    commentaire TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

-- Avis clients
INSERT INTO reviews (user_id, product_id, note, commentaire) VALUES
(1, 1, 5, 'Excellent produit, très rapide !'),
(2, 4, 4, 'Bon rapport qualité/prix.'),
(3, 2, 3, 'Correct mais un peu petit.'),
(1, 3, 5, 'Un produit de fou furieux');