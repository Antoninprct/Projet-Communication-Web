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

## Pages du site

- Accueil (index.php?page=home): présentation de la boutique, mise en avant des produits.
- Catalogue (index.php?page=products): liste des produits avec recherche et filtres.
- Détail produit (index.php?page=product&id=N): informations d'un produit + avis clients.
- Auth (index.php?page=auth): connexion / inscription utilisateur.

## Routes backend disponibles

- GET /backend/index.php/api/products/: retourne la liste des produits.
- GET /backend/index.php/api/products/{id}: retourne un produit précis.
- GET /backend/index.php/reviews/?id={productId}: retourne les avis d'un produit.
- GET /backend/index.php/api/reviews/?id={productId}: alias de la route reviews.