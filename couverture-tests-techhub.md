# Couverture de tests – TechHub (shop.missionplaywright.fr)

Liste de couverture fonctionnelle du site, organisée par page / composant (POM).
Cocher `[x]` quand le scénario est automatisé. Noter les anomalies dans la section dédiée.

**Priorités :**
- **P1** : panier, connexion, commande (parcours critiques)
- **P2** : catalogue (tri, filtres)
- **P3** : contenus statiques, liens du footer

---

## Header – `HeaderComponent` (P2)

- [ ] Le logo renvoie à l'accueil
- [ ] Les liens Accueil, Produits, À propos et Contact mènent aux bonnes pages
- [ ] L'icône de recherche fonctionne
- [ ] L'icône panier affiche un compteur mis à jour après un ajout
- [ ] L'icône compte mène à la page de connexion (`/auth`)
- [ ] Le menu burger fonctionne en affichage mobile

## Accueil – `/` (P3)

- [ ] « Découvrir les produits » mène au catalogue (`/products`)
- [ ] « En savoir plus » mène à la page À propos (`/about`)
- [ ] Les 4 catégories mènent au catalogue filtré (`?category=accessories`, `smart-home`, `gaming`, `office`)
- [ ] Les produits phares s'affichent : nom, prix, prix barré, badge promo
- [ ] Le clic sur un produit phare ouvre sa fiche
- [ ] « Voir tout » et « Voir le catalogue » mènent au catalogue

## Catalogue – `/products` (P2)

- [ ] Les 12 produits s'affichent avec un compteur cohérent
- [ ] Tri « Nouveautés »
- [ ] Tri « Popularité »
- [ ] Tri « Prix croissant »
- [ ] Tri « Prix décroissant »
- [ ] Filtre par catégorie (Toutes, Accessoires, Maison Connectée, Gaming, Bureau) avec mise à jour du compteur
- [ ] Filtre par prix (Tous les prix, Moins de 100 €, 100 € - 200 €, Plus de 200 €) avec mise à jour du compteur
- [ ] Combinaison filtre catégorie + filtre prix
- [ ] Ajout rapide au panier depuis une carte produit
- [ ] Produit en rupture de stock (Hub USB-C 12-en-1) : badge affiché, ajout impossible
- [ ] Le clic sur une carte ouvre la fiche produit

## Fiche produit – `/product/:id` (P1)

- [ ] Affichage des infos : nom, catégorie, note, prix, prix barré, description, caractéristiques, stock
- [ ] « Ajouter au panier » met à jour le compteur du header
- [ ] Bouton favori
- [ ] Bouton partage
- [ ] Les produits similaires sont de la même catégorie
- [ ] « Retour au catalogue » fonctionne
- [ ] Fiche d'un produit en rupture de stock
- [ ] Comportement avec un ID inexistant (ex. `/product/999`)

## Panier – `/cart` (P1)

- [ ] Chaque ligne affiche nom, prix unitaire, quantité et sous-total
- [ ] Le bouton + augmente la quantité et recalcule les montants
- [ ] Le bouton − diminue la quantité et recalcule les montants (minimum 1)
- [ ] Suppression d'une ligne (icône corbeille)
- [ ] « Vider le panier » affiche l'état panier vide
- [ ] Le récapitulatif affiche sous-total, livraison et total TTC
- [ ] « Passer au paiement » sans être connecté affiche « Connexion requise »
- [ ] « Continuer mes achats » renvoie vers le catalogue
- [ ] Le panier est conservé après un rechargement de la page

## Connexion / Inscription – `/auth` (P1)

- [x] Bascule entre les onglets Connexion et Inscription
- [ ] Connexion avec identifiants valides
- [ ] Connexion avec mauvais mot de passe
- [ ] Connexion avec champs vides
- [ ] Connexion avec format d'email invalide
- [ ] Inscription valide (nom complet, email, mot de passe, confirmation)
- [ ] Inscription avec mots de passe différents
- [ ] Inscription avec un email déjà utilisé
- [ ] Inscription avec champs obligatoires vides
- [ ] Lien « Mot de passe oublié ? »

## Commande – `/checkout` (P1)

- [ ] Utilisateur non connecté : écran « Connexion requise », bouton « Se connecter » et « Retour au panier »
- [ ] Utilisateur connecté : parcours d'achat complet jusqu'à la confirmation (smoke test)

## Contact – `/contact` (P2)

- [ ] Envoi du formulaire avec des données valides (nom, email, sujet, message)
- [ ] Contrôle des champs obligatoires
- [ ] Contrôle du format de l'email
- [ ] FAQ en accordéon : ouverture / fermeture des 4 questions
- [ ] Affichage des coordonnées (email, téléphone, adresse, horaires)

## Footer – `FooterComponent` (P3)

- [ ] Liens catégories (Accessoires, Maison Connectée, Gaming, Bureau) vers le catalogue filtré
- [ ] Lien À propos vers `/about`
- [ ] Lien Contact vers `/contact`
- [ ] Lien FAQ vers `/contact#faq`
- [ ] Lien email `mailto:contact@techhub.fr`
- [ ] Lien téléphone `tel:+33123456789`

## Hors périmètre (fonctionnalités non implémentées)

Liens présents mais sans page cible, donc non testés :

- Réseaux sociaux (Facebook, Twitter, Instagram, LinkedIn) : lien `#`
- Carrières, Presse, Blog, Livraison, Retours, CGV, Confidentialité, Cookies, Mentions légales : renvoient vers l'accueil (`/`)
- Seuil de livraison gratuite (dès 50 €) : tous les produits coûtent plus de 50 €, le cas en dessous du seuil n'est pas atteignable

---

## Anomalies constatées

| Page | Description | Date |
|------|-------------|------|
|      |             |      |
