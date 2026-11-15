# Mémo Structure – Comment écrire le code

> **Ce fichier** : la syntaxe et l'organisation du code (tests, POM, fixtures, données).
> Les commandes à taper dans le terminal → `MonMémoCommande.md`
> L'installation et la configuration → `Mémo-outils.md`

---

## 1. Les règles d'or

- **`await`** devant tout ce qui commence par `page.`, `expect(`, `test.step` ou le nom d'une POM.
  Pas d'`await` devant la préparation des données (`const nom = ...`).
- **Locators et actions** → dans la **POM**.
- **`expect`** (vérifications) → dans le **test**, jamais dans la POM.
- **Données** :
  - elles changent selon l'environnement (URL, compte de test) → fichier **`.env`** ;
  - elles sont propres au cas de test (e-mail invalide, mot de passe trop court) → dans le **test** ;
  - elles doivent être aléatoires → **faker**.

---

## 2. Arborescence du projet

```
Formation Playwright/
├── .github/workflows/playwright.yml   ← CI GitHub Actions
├── env/                               ← fichiers .env (jamais sur GitHub)
│   ├── .env.local
│   └── .env.prod
├── tests/
│   ├── exercice-.../xxx.spec.ts       ← les tests
│   ├── pages/                         ← les POM
│   │   └── LoginPage.ts
│   └── fixtures.ts                    ← les fixtures
├── .gitignore
├── package.json
└── playwright.config.ts
```

Chemin d'import : `../` = remonter d'un dossier. Utiliser l'autocomplétion de VS Code pour ne pas se tromper.

---

## 3. Structure d'un test

```ts
import { test, expect } from '../fixtures';   // depuis les fixtures si on utilise des POM

test.beforeEach(async ({ LoginPage }) => {
  await LoginPage.goto();
  await LoginPage.login();
  await expect(LoginPage.page).toHaveURL(/account/);
});

test('nom du cas de test', async ({ ShippingPage }) => {
  await ShippingPage.fillShippingForm('Dupont', '8 rue de la paix', 'Paris', '75001');
  await ShippingPage.continue();
  await expect(ShippingPage.page).toHaveURL(/payment/);
});
```

- `test.beforeEach` = précondition exécutée avant **chaque** test du fichier.
- Un `expect` après chaque étape importante → l'échec est signalé au bon endroit.

---

## 4. test.step (découper un test en étapes)

```ts
await test.step('Saisir l\'adresse de livraison', async () => {
  await ShippingPage.fillShippingForm(name, address, city, zipCode);
  await expect(ShippingPage.page).toHaveURL(/payment/);
});
```

- ⚠️ Toujours `await` devant `test.step`, sinon toutes les étapes partent en même temps.
- Noms d'étapes **métier** (comme dans un cahier de recette) → rapport lisible par tous.

---

## 5. Tags (classer les cas de test)

```ts
test('connexion valide', { tag: ['@smoke', '@login', '@prod'] }, async ({ LoginPage }) => {
});
```

| Tag | Quand le lancer | Contenu |
|---|---|---|
| `@smoke` | À chaque push | Les parcours critiques |
| `@regression` | La nuit ou avant une livraison | Tous les cas, y compris les erreurs |
| `@login`, `@checkout` | Quand on modifie cette fonctionnalité | Les tests d'une fonctionnalité |
| `@prod` | Juste après une mise en production | Tests sans risque (aucune action irréversible) |

Commande pour lancer un tag → `MonMémoCommande.md`

---

## 6. Locators (trouver un élément)

| Locator | Exemple | Quand l'utiliser |
|---|---|---|
| `getByRole` | `page.getByRole('button', { name: 'Valider' })` | En priorité : ce que voit l'utilisateur |
| `getByTestId` | `page.getByTestId('checkout-name')` | Quand les développeurs ont mis des `data-testid` (très stable) |
| `getByLabel` | `page.getByLabel('Email')` | Champs de formulaire avec un label |
| `locator('#id')` | `page.locator('#firstName')` | Par l'`id` HTML (`#` = id) |

Rôles courants : `button`, `link`, `textbox`, `checkbox`, `radio`, `combobox` (liste déroulante), `heading` (titre), `dialog`, `alert`.

Astuce : **Pick locator** (codegen ou extension VS Code) propose le meilleur locator.

---

## 7. Assertions courantes (expect)

```ts
await expect(locator).toBeVisible();                 // l'élément est affiché
await expect(locator).toHaveText('Commande validée'); // texte exact
await expect(locator).toHaveValue('John');           // valeur d'un champ
await expect(locator).toBeChecked();                 // case cochée
await expect(locator).not.toBeChecked();             // case décochée
await expect(page).toHaveURL(/account/);             // l'URL CONTIENT "account" (regex / /)
await expect(page).toHaveURL('/account');            // l'URL est exactement baseURL + /account
```

- `expect` **attend** jusqu'à 5 secondes avant d'échouer (pas besoin de pause).


---

## 8. POM (Page Object Model)

**Rôle** : regrouper les locators et les actions d'une page.
**Intérêt** : si un élément change sur le site, on corrige **une seule ligne** dans la POM, et tous les tests remarchent.

```ts
import { Page, Locator } from '@playwright/test';

export class ShippingPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly nextButton: Locator;

  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByTestId('checkout-name');
    this.addressInput = page.getByTestId('checkout-address');
    this.cityInput = page.getByTestId('checkout-city');
    this.zipInput = page.getByTestId('checkout-zip');
    this.nextButton = page.getByTestId('checkout-next');
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto('/exercises/checkout-form');
  }

  async fillShippingForm(name: string, address: string, city: string, zipCode: string) {
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.zipInput.fill(zipCode);
  }

  async continue() {
    await this.nextButton.click();
  }
}
```

- `export class` : sinon impossible d'importer la POM.
- Classe en **PascalCase** (`ShippingPage`), propriétés en **camelCase** (`nameInput`).
- Les données arrivent **en paramètres** : la POM ne sait pas d'où elles viennent.

---

## 9. Fixtures (donner les POM aux tests)

**Rôle** : créer les POM automatiquement → le test les demande dans `async ({ ... })` sans faire de `new`.

Fichier `tests/fixtures.ts` :

```ts
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';        // ① import
import { ShippingPage } from './pages/ShippingPage';  // ① import

type Fixtures = {
  LoginPage: LoginPage;                               // ② type
  ShippingPage: ShippingPage;                         // ② type
};

const test = base.extend<Fixtures>({
  LoginPage: async ({ page }, use) => {               // ③ extend
    await use(new LoginPage(page));
  },
  ShippingPage: async ({ page }, use) => {            // ③ extend
    await use(new ShippingPage(page));
  },
});

const expect = base.expect;

export { test, expect };
```

Nouvelle POM = l'ajouter à **3 endroits** (① import, ② type, ③ extend), avec **exactement le même nom** en ② et ③.

Dans le test : `import { test, expect } from '../fixtures';` (et non `'@playwright/test'`).

---

## 10. Données de test

### Faker (données aléatoires)

```ts
import { fakerFR as faker } from '@faker-js/faker';   // fakerFR = données françaises
.toLowerCase() ==> pour email en minuscule si majuscule reçue

const name = faker.person.lastName();
const address = faker.location.streetAddress();
const email = faker.internet.email().toLowerCase(); si données reçues en majucule conversation en minuscule
const city = faker.location.city();
const zipCode = faker.location.zipCode('#####');      // 5 chiffres
const cardExpiry = faker.date.future().toLocaleDateString('fr-FR', { month: '2-digit', year: '2-digit' }); // ex : 07/27
```

- `faker.name` / `faker.address` = anciennes versions → utiliser `faker.person` / `faker.location`.
- Faker s'utilise dans le **test**, pas dans la POM.


### Assembler des textes (template literal)

Texte entre **backticks** `` ` `` (AltGr + 7) + `${variable}` pour insérer une valeur :

```ts
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const fullName = `${firstName} ${lastName}`;   // ex : "Jean Dupont"
```

Déjà utilisé dans `playwright.config.ts` : `` `env/.env.${process.env.ENV}` `

### .env (données qui changent selon l'environnement)

Dans les fichiers `env/.env.local` et `env/.env.prod` :
```
URL=https://practice.missionplaywright.fr/
LOGIN_EMAIL=compte.de.test@exemple.fr
LOGIN_PASSWORD=MotDePasseDeTest
```

Dans le code : `process.env.NOM_DE_LA_VARIABLE!`

```ts
// Dans la POM LoginPage.ts
async login() {
  await this.emailInput.fill(process.env.LOGIN_EMAIL!);
  await this.passwordInput.fill(process.env.LOGIN_PASSWORD!);
  await this.loginButton.click();
}
```

- Le `.env` est une simple **fiche** (adresse + compte de test). Il ne se connecte à rien.
- Le `!` dit à TypeScript « la valeur existe ». Si elle est vide → erreur `expected string, got undefined`.
- Le nom doit être **identique** dans le `.env` et dans le code.

### baseURL (playwright.config.ts)

```ts
use: {
  baseURL: process.env.URL,
}
```

Dans les tests et les POM, on n'écrit plus que la fin de l'adresse :
```ts
await page.goto('/exercises/checkout');   // au lieu de 'https://site.../exercises/checkout'
```

Le changement d'URL se fait **là où elle est écrite** : dans la POM si elle y est, sinon dans le test.

---

## 11. Pièges fréquents

| Symptôme | Cause probable |
|---|---|
| Un `expect` échoue sur un élément qui devrait être là | `await` manquant (souvent devant `test.step`) |
| Blocage 30 s puis `Test timeout` | Une action attend un élément qui n'apparaît jamais (mauvais locator, mauvaise page, mot de passe faux) |
| `expected string, got undefined` | Variable `.env` vide : `ENV` non défini ou nom mal écrit |
| `0 arguments attendus, mais 1 reçus` | Paramètre passé à une méthode de POM qui n'en attend pas |
| `La propriété 'XxxPage' n'existe pas` | POM pas déclarée dans `fixtures.ts` (oubli d'un des 3 endroits) |
| `n'est pas attribuable au type string` | Mauvais type, ex : une `Date` au lieu d'un texte |
| Rien ne s'importe, tout est rouge | Mauvais chemin d'import (`../` en trop ou en moins) |
| Erreur `(ligne:colonne)` | Regarder à cet endroit **et juste avant** |
