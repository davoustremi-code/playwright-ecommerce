# Mémo outils – Formation Playwright / TypeScript

> **Ce fichier** : tout ce qu'il faut installer et configurer (une seule fois par PC).
> Les commandes du quotidien → `MonMémoCommande.md`
> Le code (tests, POM, fixtures) → `MonMémoStructure.md`

Les commandes sont à taper dans le terminal PowerShell de VS Code, **à la racine du projet** (là où se trouve `playwright.config.ts`).

---

## 1. Logiciels à installer sur le PC

### Git
Gestion des versions du code et lien avec GitHub.

```powershell
winget install Git.Git
```
Ou téléchargement sur https://git-scm.com

Vérifier : `git --version`

### Node.js (version LTS)
Nécessaire pour faire tourner Playwright. Installe aussi `npm` (gestionnaire de librairies).

```powershell
winget install OpenJS.NodeJS.LTS
```
Ou téléchargement sur https://nodejs.org (prendre la version **LTS**)

Vérifier : `node -v` et `npm -v`

### Visual Studio Code
Éditeur de code.

```powershell
winget install Microsoft.VisualStudioCode
```
Ou téléchargement sur https://code.visualstudio.com

---

## 2. Extensions

### Extension VS Code : Playwright Test for VSCode
Lancer les tests depuis VS Code (triangle ▶, panneau fiole 🧪), Pick locator.

Onglet **Extensions** de VS Code (Ctrl+Shift+X) → chercher **Playwright Test for VSCode** (éditeur : Microsoft) → **Installer**.

### Extension VS Code : GitHub Copilot
Assistant IA dans VS Code : propose du code au fil de la frappe, explique du code, aide à corriger les erreurs.

Onglet **Extensions** de VS Code (Ctrl+Shift+X) → chercher **GitHub Copilot** (éditeur : GitHub) → **Installer**, puis se connecter avec son compte GitHub.

Abonnement payant, rattaché au compte GitHub (pas au PC) : il suffit de se reconnecter sur chaque nouveau PC.
Frais professionnels : conserver les factures (GitHub → Settings → Billing and licensing).

### Extension VS Code : GitHub Actions
Aide à écrire les fichiers `.yml` de workflow (autocomplétion, détection des erreurs d'indentation) et affiche l'état des runs de CI dans VS Code.

Onglet **Extensions** → chercher **GitHub Actions** (éditeur : GitHub) → **Installer**, puis se connecter avec son compte GitHub.

### Extension Chrome : Playwright CRX
Enregistrer des actions dans Chrome et générer le code Playwright.

Chrome Web Store → chercher **Playwright CRX** → **Ajouter à Chrome**.

---

## 3. Playwright dans le projet

### Créer un projet Playwright
Uniquement pour un **nouveau** projet (crée `@playwright/test`, `@types/node`, `playwright.config.ts` et le dossier `tests`).

```powershell
npm init playwright@latest
```

### Installer les dépendances d'un projet existant
Installe tout ce qui est listé dans `package.json` (Playwright, faker, dotenv…).

```powershell
npm install
```

### Installer les navigateurs de Playwright
Chromium (Chrome), Firefox et WebKit (Safari). À faire **une fois par PC**.

```powershell
npx playwright install
```

---

## 4. Librairies (dépendances npm)

### Faker
Génère des données de test aléatoires (noms, adresses, e-mails…).

```powershell
npm install @faker-js/faker --save-dev
```

Utilisation :
```ts
import { fakerFR as faker } from '@faker-js/faker';

const nom = faker.person.lastName();
```

### dotenv
Lit les fichiers `.env` (URL et données de chaque environnement).

```powershell
npm install dotenv
```

Dans `playwright.config.ts` (au-dessus de `defineConfig`) :
```ts
import dotenv from 'dotenv';

dotenv.config({
  path: `env/.env.${process.env.ENV ?? 'local'}`,
});
```

Et dans le bloc `use` :
```ts
baseURL: process.env.URL,
```

---

## 5. Fichiers .env (à recréer sur chaque PC)

Les fichiers `.env` ne sont **jamais** envoyés sur GitHub : il faut les créer à la main sur chaque PC.

Dossier `env` **à la racine** du projet (au même niveau que `playwright.config.ts`) :

```
env/
├── .env.local
└── .env.prod
```

`.env.local` :
```
URL=https://practice.missionplaywright.fr/
FIRSTNAME=John
LASTNAME=Dupont
EMAIL=matthieu@yopmail.com
LOGIN_EMAIL=compte.de.test@exemple.fr
LOGIN_PASSWORD=MotDePasseDeTest
```

`.env.prod` :
```
URL=https://techhubecommerce.netlify.app/
FIRSTNAME=Matthieu
LASTNAME=Dupont
EMAIL=matthieu@yopmail.com
LOGIN_EMAIL=compte.de.test@exemple.fr
LOGIN_PASSWORD=MotDePasseDeTest
```

Remplacer `LOGIN_EMAIL` / `LOGIN_PASSWORD` par le vrai compte de test de chaque environnement.
Règle : une valeur qui change selon l'environnement → `.env` ; sinon → dans le test.

### .gitignore
Ajouter à la fin du fichier `.gitignore` :
```
# Variables d'environnement (informations sensibles)
.env.*
```

Vérifier : `git status` → les fichiers `.env` ne doivent pas apparaître.

Choisir l'environnement au lancement (`$env:ENV="prod"`) → `MonMémoCommande.md`

---

## 6. GitHub

### Compte et dépôt
Compte sur https://github.com + dépôt du projet.

### GitHub Actions (CI)
Fichier `.github/workflows/playwright.yml` : lance les tests à chaque `push`.

### Secrets (remplacent les fichiers .env pour la CI)
Les fichiers `.env` n'étant pas sur GitHub, la CI récupère les valeurs via des secrets.

GitHub → dépôt → **Settings → Secrets and variables → Actions → New repository secret**, un secret par variable :
- `URL` → `https://practice.missionplaywright.fr/`
- `LOGIN_EMAIL` → e-mail du compte de test
- `LOGIN_PASSWORD` → mot de passe du compte de test

Dans `playwright.yml`, étape « Run Playwright tests » :
```yaml
      - name: Run Playwright tests
        run: npx playwright test
        env:
          URL: ${{ secrets.URL }}
          LOGIN_EMAIL: ${{ secrets.LOGIN_EMAIL }}
          LOGIN_PASSWORD: ${{ secrets.LOGIN_PASSWORD }}
```

- Dans le log, `injected env (0) from env/.env.undefined` est **normal** en CI (pas de fichier `.env`).
- `URL: ***` dans le log = le secret est bien transmis (GitHub masque la valeur).
- Si un mot de passe change : le modifier dans le `.env` de chaque PC **et** dans le secret GitHub.

### Lire un échec de CI
- Échec à l'étape **Install** → problème d'infrastructure (réseau GitHub…) : relancer avec **Re-run jobs**.
- Échec à l'étape **Run Playwright tests** → analyser les tests (ou une variable manquante).
- Rapport détaillé : run → section **Artifacts** → `playwright-report` → dézipper → ouvrir `index.html`.

---

## 7. Point Windows : WebKit bloqué

Sur certains PC (installations récentes de Windows 11), le **Contrôle intelligent des applications** bloque WebKit (`ms-playwright\webkit-...\Playwright.exe`).

- Solution simple : lancer uniquement Chrome sur ce PC
  ```powershell
  npx playwright test --project=chromium
  ```
- Ou désactiver : Sécurité Windows → Contrôle des applications et du navigateur → Contrôle intelligent des applications → **Désactivé**.
  ⚠️ Impossible de le réactiver sans réinstaller Windows.

---

## ✅ Checklist « Nouveau PC »

1. Installer **Git**, **Node.js (LTS)** et **VS Code**
2. Installer les extensions VS Code **Playwright Test for VSCode**, **GitHub Copilot** et **GitHub Actions** (se connecter au compte GitHub)
3. Installer l'extension Chrome **Playwright CRX**
4. Récupérer le projet : `git clone` + adresse du dépôt (bouton vert **Code** sur GitHub)
5. Ouvrir **le bon dossier** dans VS Code (celui qui contient `playwright.config.ts`)
6. Installer les dépendances : `npm install`
7. Installer les navigateurs : `npx playwright install`
8. Créer le dossier `env` avec `.env.local` et `.env.prod`
9. Lancer un test pour vérifier :
   ```powershell
   $env:ENV="local"
   npx playwright test --project=chromium
   ```
10. Vérifier `injected env (4) from env\.env.local` et des tests au vert ✅

### Routine à chaque changement de PC
- **En arrivant** : `git pull` puis `npm install`
- **En partant** : `git add .` → `git commit -m "..."` → `git push`
