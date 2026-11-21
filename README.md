# Automatisation des tests d'un site e-commerce – Playwright / TypeScript

[![Playwright Tests](https://github.com/davoustremi-code/playwright-ecommerce/actions/workflows/playwright.yml/badge.svg)](https://github.com/davoustremi-code/playwright-ecommerce/actions/workflows/playwright.yml)

Projet d'automatisation de tests end-to-end réalisé dans le cadre de la formation **Mission Playwright**.
Il porte sur **TechHub**, un site e-commerce de démonstration : [shop.missionplaywright.fr](https://shop.missionplaywright.fr/).

L'objectif est de construire une suite de tests maintenable et lisible, en partant d'une démarche QA : identifier les parcours critiques, prioriser les risques, puis automatiser.

---

## Stack technique

| Outil | Usage |
|---|---|
| **Playwright Test** | Exécution des tests end-to-end sur Chromium, Firefox et WebKit |
| **TypeScript** | Langage des tests et des Page Objects |
| **Page Object Model** | Une classe par page ou composant, qui regroupe ses locators et ses actions |
| **Fixtures Playwright** | Injection automatique des Page Objects dans les tests |
| **Faker** | Génération de données de test réalistes (identité, adresse, carte de paiement) |
| **dotenv** | Configuration de l'URL par environnement |
| **GitHub Actions** | Intégration continue : exécution des tests à chaque push et pull request |

---

## Structure du projet

```
playwright-ecommerce/
├── .github/workflows/
│   └── playwright.yml        # Pipeline d'intégration continue
├── pages/                    # Page Objects : locators et actions par page
│   ├── components/
│   │   ├── HeaderComponent.ts
│   │   └── FooterComponent.ts
│   ├── HomePage.ts
│   ├── AuthentificationPage.ts
│   ├── CatalogPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── AccountPage.ts
├── tests/
│   ├── fixtures.ts           # Fixtures qui fournissent les Page Objects aux tests
│   └── SmokeTest.spec.ts     # Smoke test du parcours d'achat complet
├── couverture-tests-techhub.md   # Liste de couverture et anomalies constatées
└── playwright.config.ts      # Configuration Playwright (navigateurs, baseURL, rapports)
```

Règle appliquée dans tout le projet : **les locators et les actions sont dans les Page Objects, les vérifications (`expect`) sont dans les tests.**

---

## Tests automatisés

### Smoke test – parcours d'achat complet `@smoke`

Vérifie en un seul scénario que le parcours principal du site fonctionne de bout en bout :

1. Accès à la page d'accueil
2. Création d'un compte depuis la page d'authentification
3. Choix d'un produit dans le catalogue
4. Ajout au panier et contrôle du prix
5. Saisie des informations de livraison
6. Saisie des informations de paiement
7. Validation de la commande et affichage du numéro de commande

Chaque étape est découpée en `test.step` pour un rapport lisible.

### Stratégie de couverture

Les scénarios à couvrir sont listés et priorisés dans [`couverture-tests-techhub.md`](./couverture-tests-techhub.md) :

- **P1** : panier, authentification, commande (parcours critiques)
- **P2** : catalogue, tri et filtres, formulaire de contact
- **P3** : contenus statiques et liens du footer

Ce fichier recense aussi les fonctionnalités non implémentées sur le site de démonstration et les anomalies constatées pendant les tests exploratoires.

---

## Lancer les tests

### Prérequis

- [Node.js](https://nodejs.org/) (version LTS)
- Git

### Installation

```bash
git clone https://github.com/davoustremi-code/playwright-ecommerce.git   # récupère le projet
cd playwright-ecommerce                                                    # entre dans le dossier du projet
npm ci                                                                     # installe les dépendances
npx playwright install --with-deps                                         # installe les navigateurs de test
```

### Configuration

Créer le fichier `env/.env.recette` avec l'URL du site testé :

```
URL=https://shop.missionplaywright.fr/
```

Ce fichier n'est pas versionné. En intégration continue, l'URL est fournie par un secret GitHub.

### Exécution

```bash
npx playwright test                    # lance tous les tests sur les trois navigateurs
npx playwright test --grep @smoke      # lance uniquement le smoke test
npx playwright test --ui               # ouvre le mode interactif pour suivre les tests pas à pas
npx playwright show-report             # ouvre le rapport HTML de la dernière exécution
```

---

## Intégration continue

Le workflow GitHub Actions (`.github/workflows/playwright.yml`) s'exécute à chaque push et à chaque pull request sur `main` :

1. Installation des dépendances et des navigateurs
2. Exécution de la suite de tests
3. Publication du rapport HTML en artefact, conservé 30 jours

Le développement se fait par branches et pull requests : une fonctionnalité de test par branche, fusionnée dans `main` une fois la CI au vert.

---

## Avancement

- [x] Configuration du projet : environnements, baseURL, secrets CI
- [x] Page Objects des pages principales, du header et du footer
- [x] Smoke test du parcours d'achat complet
- [x] Intégration continue avec GitHub Actions
- [ ] Tests de l'authentification : connexion, inscription, cas d'erreur
- [ ] Tests du panier et du catalogue
- [ ] Tests des liens du footer

---

## Auteur

**Rémi Davoust** – Ingénieur QA fonctionnel, en montée en compétences sur l'automatisation Playwright / TypeScript.
[LinkedIn](https://www.linkedin.com/in/davoustremi/)
