# Projet-Communication-Web
Lien GitHub https://github.com/Antoninprct/Projet-Communication-Web

Antonin Percot: Responsable front-end

Antoine Fribault: Responsable back-end

Dorian Desmars: Responsable Git

Projet: Boutique en ligne simplifiée

**Catégories de produits:**
- Equipements
- Fusils d'assaut
- AEG
- PISTOLETS GBB
- SNIPERS
- Autres

## Installation

1. Cloner le dépôt:
```bash
git clone https://github.com/Antoninprct/Projet-Communication-Web.git
cd Projet-Communication-Web
```
2. Mettre les permissions pour la base de données:
```bash
sudo chmod -R 777 DB/
```

3. Démarrer apache2
```bash
sudo service apache2 start
```

4. Démarrer serveur websocket
```bash
python3 ServSupport.py
```

## Comptes
- Admin:
    - Email: antoine@panpan.local
    - Mot de passe: admin123
- Client:
    - Email: bob@panpan.local
    - Mot de passe: client123

## Pages du site

- Accueil (index.php?page=home): présentation de la boutique, mise en avant des produits.
- Catalogue (index.php?page=products): liste des produits avec recherche et filtres.
- Détail produit (index.php?page=product&id=N): informations d'un produit + avis clients.
- Auth (index.php?page=auth): connexion / inscription utilisateur.

## Routes backend disponibles

- GET /backend/index.php/api/products/: retourne la liste des produits.
- GET /backend/index.php/api/products/{id}: retourne un produit précis.
- POST /backend/index.php/api/products/: ajoute un produit.
- PUT /backend/index.php/api/products/{id}: modifie un produit.
- DELETE /backend/index.php/api/products/{id}: supprime un produit.

- GET /backend/index.php/reviews/?id={productId}: retourne les avis d'un produit.
- GET /backend/index.php/api/reviews/?id={productId}: alias de la route reviews.
- POST /backend/index.php/api/reviews/: ajoute un avis.
- PUT /backend/index.php/api/reviews/?id={reviewId}: modifie un avis.
- DELETE /backend/index.php/api/reviews/?id={reviewId}: supprime un avis.

- POST /backend/index.php/api/login: authentifie un utilisateur.
