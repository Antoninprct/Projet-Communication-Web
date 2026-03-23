
CREATE TABLE IF NOT EXISTS user (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nom      TEXT    NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role     TEXT    NOT NULL DEFAULT 'user'
);


CREATE INDEX IF NOT EXISTS idx_user_nom ON user(nom);


INSERT INTO user (nom, mot_de_passe, role) VALUES ('antoine', 'legoat', 'admin');
INSERT INTO user (nom, mot_de_passe, role) VALUES ('bob',   'hashed_password_2', 'client');
INSERT INTO user (nom, mot_de_passe, role) VALUES ('carol', 'hashed_password_3', 'client');


CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nom         TEXT    NOT NULL,
    description TEXT,
    prix        REAL    NOT NULL DEFAULT 0.0,
    stock       INTEGER NOT NULL DEFAULT 0
    
);

CREATE INDEX IF NOT EXISTS idx_products_nom ON products(nom);

INSERT INTO products (nom, description, prix, stock) VALUES ('ak 47',    'tire tres fort', 299.99, 10);
INSERT INTO products (nom, description, prix, stock) VALUES ('f2000',    'Edouard', 199.99, 10);
INSERT INTO products (nom, description, prix, stock) VALUES ('armure bekam',    'full netherite', 199.99, 5);
INSERT INTO products (nom, description, prix, stock) VALUES ('flashbang',    'fait mal aux neuilles', 20, 50);
INSERT INTO products (nom, description, prix, stock) VALUES ('famas',    'ça c un vrai ', 2229.99, 50);
INSERT INTO products (nom, description, prix, stock) VALUES ('bazooka',   'pas au dessus de 2 joule par contre', 500.99, 1);



CREATE TABLE IF NOT EXISTS reviews (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    product_id  INTEGER NOT NULL,
    note        INTEGER NOT NULL CHECK (note BETWEEN 1 AND 5),
    commentaire TEXT,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id)    REFERENCES user(id)     ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user    ON reviews(user_id);

INSERT INTO reviews (user_id, product_id, note, commentaire) VALUES (1, 1, 5, 'Excellent produit, très rapide !');
INSERT INTO reviews (user_id, product_id, note, commentaire) VALUES (2, 4, 4, 'Bon rapport qualité/prix.');
INSERT INTO reviews (user_id, product_id, note, commentaire) VALUES (3, 2, 3, 'Correct mais un peu petit.');
INSERT INTO reviews (user_id, product_id, note, commentaire) VALUES (1, 3, 5, 'Un produit de fou furieux');