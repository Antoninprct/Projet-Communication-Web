
CREATE TABLE IF NOT EXISTS user (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nom      TEXT    NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role     TEXT    NOT NULL DEFAULT 'user'
);

CREATE INDEX IF NOT EXISTS idx_user_nom ON user(nom);


INSERT INTO user (nom, mot_de_passe, role) VALUES ('antoine', '1234', 'admin');
INSERT INTO user (nom, mot_de_passe, role) VALUES ('bob',   'password', 'client');
INSERT INTO user (nom, mot_de_passe, role) VALUES ('carol', 'aaaaaaaa', 'client');