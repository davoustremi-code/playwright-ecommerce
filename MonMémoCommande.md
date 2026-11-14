# Mémo Commandes – Ce qu'on tape dans le terminal

> **Ce fichier** : les commandes du terminal PowerShell de VS Code.
> Le code (tests, POM, fixtures) → `MonMémoStructure.md`
> L'installation et la configuration → `Mémo-outils.md`

⚠️ Toujours taper les commandes **à la racine du projet** (le dossier qui contient `playwright.config.ts`).

---

## 1. Lancer les tests

```powershell
npx playwright test                              # tous les tests, tous les navigateurs
npx playwright test 02checkboxes                 # un seul fichier (une partie du nom suffit)
npx playwright test --ui                         # interface graphique (voir chaque étape)
npx playwright test --headed                     # voir le navigateur s'ouvrir
npx playwright test --project=chromium           # uniquement Chrome
npx playwright test 02checkboxes --repeat-each=5 # relancer 5 fois (démasquer un test instable)
```

Un test fiable doit passer **à tous les coups** : `--repeat-each` permet de vérifier qu'un test ne passe pas « par chance ».

### Filtrer par tag

```powershell
npx playwright test --grep "@smoke"              # uniquement les tests @smoke
npx playwright test --grep-invert "@prod"        # tous SAUF les tests @prod
```

⚠️ Sous PowerShell, toujours mettre le tag **entre guillemets** (sinon erreur « variable non définie »).

### Voir le rapport Playwright

```powershell
npx playwright show-report                       # ouvrir le rapport HTML du dernier lancement
```

Dans le rapport : cliquer sur un test en échec → **Trace** → revoir chaque action avec la capture de la page (ex : message d'erreur du site, mauvais clic).

### Rapport Allure

```powershell
npx playwright test                              # lancer les tests (remplit le dossier allure-results)
npx allure generate allure-results --clean       # générer le rapport (--clean : supprime l'ancien rapport)
npx allure open allure-report                    # ouvrir le rapport dans le navigateur
```

- **Ctrl+C** dans le terminal pour arrêter le serveur Allure.
- `allure-results/` et `allure-report/` sont regénérés à chaque fois → ils sont dans le `.gitignore`.
- `npx allure watch allure-results` (commande de la slide) n'affiche pas les résultats déjà présents → préférer `generate` + `open`.

---

## 2. Choisir l'environnement

```powershell
$env:ENV="recette"                                 # lit env/.env.local
$env:ENV="prod"                                  # lit env/.env.prod
npx playwright test
```

| Commande | Rôle |
|---|---|
| `$env:ENV` | Afficher l'environnement actif |
| `Remove-Item Env:ENV` | Effacer la variable |

- Vérifier la 1re ligne au lancement : `injected env (4) from env\.env.prod`
- `env\.env.undefined` = environnement non défini.
- La variable reste active **tant que le terminal est ouvert**. Nouveau terminal = la retaper (sinon `local` par défaut).
- Le mode `--ui` garde l'environnement choisi **à son ouverture**.
- Le triangle ▶ de VS Code ne voit pas `$env:ENV` → il prend `local` par défaut.

---

## 3. Trouver un locator

```powershell
npx playwright codegen https://practice.missionplaywright.fr
```

Ouvre le site + l'enregistreur. Bouton **Pick locator** → survoler un élément → Playwright affiche le meilleur locator.

---

## 4. npm scripts (raccourcis)

Dans `package.json`, section `scripts` :
```json
"scripts": {
  "checkboxes": "playwright test 02checkboxes",
  "faker": "playwright test 01-Remplissage-Formulaire-Faker-et-step"
}
```

Lancer :
```powershell
npm run checkboxes
```

---

## 5. Git

| Commande | Rôle |
|---|---|
| `git status` | Voir l'état des fichiers (à faire **avant** chaque pull/commit) |
| `git pull` | **Récupérer** les mises à jour depuis GitHub (GitHub → PC) |
| `git add .` | Préparer **tous** les fichiers modifiés |
| `git add nomDuFichier` | Préparer **un seul** fichier (utile si deux sujets sont mélangés) |
| `git commit -m "message"` | Enregistrer une version avec un message |
| `git push` | **Envoyer** ses commits sur GitHub (PC → GitHub) |
| `git diff nomDuFichier` | Voir ce qui a changé dans un fichier (`-` rouge = avant, `+` vert = après) |
| `git restore nomDuFichier` | Annuler les modifications d'un fichier (⚠️ perdues définitivement) |
| `git log --oneline -5` | Voir les 5 derniers commits |

### Routine

- **En arrivant sur un PC** :
  - `git pull` → récupérer le code à jour depuis GitHub
  - `npm install` → installer les librairies (utile si `package.json` apparaît dans le résultat du `git pull`)
- **En partant** :
  - `git add .` → préparer tous les fichiers modifiés
  - `git commit -m "..."` → enregistrer une version avec un message
  - `git push` → envoyer sur GitHub

Image : `add` = mettre dans le colis, `commit` = fermer le colis et écrire l'étiquette, `push` = l'envoyer.

### Équivalents dans VS Code (sans terminal)

| Bouton / action VS Code | Commande équivalente |
|---|---|
| Nom de branche en bas à gauche → **Créer une branche…** | `git checkout -b nom-du-sujet` |
| Nom de branche en bas à gauche → choisir une branche | `git checkout nom-de-branche` |
| **Valider** | `git add .` + `git commit -m "message"` |
| **Publier la branche** (1re fois) | `git push -u origin nom-de-branche` |
| **Valider et envoyer** | `git add .` + `git commit -m "..."` + `git push` |
| **Synchroniser** | `git pull` + `git push` |

Dans la barre d'état (en bas à gauche) : `nom-de-branche*` → l'étoile `*` = modifications non commitées.
⚠️ Avant de cliquer sur « Valider », vérifier **sur quelle branche** on est.

### Ma journée avec Git (projet partagé en équipe)

Règle : **un sujet = une branche**. Plusieurs sujets sur le même site = plusieurs branches.
On ne travaille jamais directement sur `main`.

#### ☀️ En arrivant le matin

```powershell
git checkout main                    # revenir sur la branche principale
git pull                             # récupérer le travail fusionné par l'équipe depuis hier
npm install                          # installer les librairies ajoutées par l'équipe (si package.json a changé)
git branch                           # voir mes branches en cours (celle active a une *)
```

**Cas 1 – je commence un nouveau sujet :**
```powershell
git checkout -b nom-du-sujet         # créer la branche du sujet (à partir de main à jour) et aller dessus
```
⚠️ Toujours créer une branche **depuis `main` à jour**, jamais depuis une autre branche (sinon elle embarque le travail de l'autre branche).
Nom de branche : un **sujet**, en minuscules avec des tirets (ex : `fiabilisation-checkout`, `ajout-allure`), pas un nom de fichier.

**Cas 2 – je reprends un sujet commencé hier :**
```powershell
git checkout nom-du-sujet            # retourner sur ma branche
git pull origin main --rebase        # intégrer à ma branche les nouveautés de main (travail de l'équipe)
```

#### 💻 Pendant la journée

```powershell
git status                           # voir ce que j'ai modifié
git add .                            # préparer tous les fichiers modifiés
git commit -m "message clair"        # enregistrer une étape (commiter souvent, à chaque étape qui fonctionne)
```
Bon rythme : **un commit = une étape qui fonctionne** (ex : un cas de test qui passe). Message qui dit ce qui a été fait (pas « modif »).
Après un `npm install` : vérifier si `package.json` apparaît dans `git status` → le commiter avec le changement (sinon la CI ne trouvera pas la librairie).

**Changer de sujet en cours de journée** (passer sur une autre branche) :
```powershell
git add .                            # préparer le travail en cours
git commit -m "WIP : en cours"       # l'enregistrer sur la branche actuelle (WIP = work in progress)
git checkout autre-sujet             # aller sur l'autre branche
```
Ou, pour mettre de côté sans commiter :
```powershell
git stash                            # mettre de côté les modifications non commitées
git checkout autre-sujet             # aller sur l'autre branche
# ... plus tard, retour sur la 1re branche ...
git checkout nom-du-sujet            # revenir sur la branche d'origine
git stash apply                      # récupérer les modifications mises de côté
```

#### ✅ Quand le sujet est terminé (valider son travail)

```powershell
npx playwright test                  # 1. vérifier que TOUS les tests passent en local
git add .                            # 2. préparer les derniers fichiers modifiés
git commit -m "Description du sujet" # 3. enregistrer la version finale
git pull origin main --rebase        # 4. intégrer les dernières nouveautés de main (éviter les conflits)
git push -u origin nom-du-sujet      # 5. envoyer la branche sur GitHub (après un rebase : git push --force-with-lease)
```

6. Sur GitHub : **Compare & pull request** → `base: main` ← `compare: nom-du-sujet` → décrire le changement → **Create pull request**.
7. Attendre la **CI ✅** et la **relecture** d'un collègue (corriger si demandé : commit + push sur la même branche, la PR se met à jour toute seule).
8. **Merge pull request** → **Delete branch**.

```powershell
git checkout main                    # 9. revenir sur main
git pull                             # 10. récupérer main avec mon travail fusionné
git branch -D nom-du-sujet           # 11. supprimer la branche sur mon PC (le sujet est terminé)
```

#### 🌙 En partant le soir (sujet pas terminé)

```powershell
git add .                            # préparer le travail en cours
git commit -m "WIP : où j'en suis"   # l'enregistrer
git push                             # l'envoyer sur GitHub (sauvegarde, et récupérable depuis un autre PC)
```

---

### Travailler avec des branches (méthode en entreprise)

Une branche = une copie de travail isolée. En équipe, on ne travaille jamais directement sur `main`.

```powershell
git checkout main                    # 1. revenir sur la branche principale
git pull                             # 2. récupérer la dernière version depuis GitHub
git checkout -b nom-de-ma-branche    # 3. créer sa branche et aller dessus
# ... coder, tester ...
git add .                            # 4. préparer tous les fichiers modifiés (les mettre dans le « colis »)
git commit -m "message"              # 5. enregistrer une version avec un message qui décrit le changement
git push -u origin nom-de-ma-branche # 6. envoyer la branche sur GitHub (-u : la 1re fois seulement, ensuite git push suffit)
```

7. Sur GitHub : **Compare & pull request** → `base: main` ← `compare: nom-de-ma-branche` → **Create pull request**.
8. La CI se lance sur la PR. Si elle est verte ✅ → **Merge pull request** (fusion dans `main`).
9. Revenir sur `main` en local : `git checkout main` puis `git pull`.

La PR va **de ma branche vers `main`** (et pas l'inverse).

| Commande | Rôle |
|---|---|
| `git branch` | Voir les branches (celle en cours a une `*`) |
| `git checkout nom-de-branche` | Changer de branche |
| `git checkout -b nom-de-branche` | Créer une branche et aller dessus |
| `git stash` | Mettre de côté son travail non commité |
| `git stash apply` | Récupérer le travail mis de côté |
| `git branch -D nom-de-branche` | Supprimer une branche locale |
| `git pull origin main --rebase` | Mettre sa branche à jour avec les dernières modifications de `main` |
| `git push --force-with-lease` | Renvoyer sa branche après un rebase (uniquement dans ce cas) |

⚠️ `--force-with-lease` réécrit l'historique sur GitHub : uniquement sur **sa propre branche**, jamais sur `main`.
ℹ️ Selon les projets, la branche principale s'appelle `main` ou `master`.

### Erreurs courantes

| Message | Signification / solution |
|---|---|
| `not a git repository` | Mauvais dossier : ouvrir le dossier qui contient `.git` et `playwright.config.ts` |
| `Your local changes ... would be overwritten` | Fichier modifié en local ET sur GitHub. Si GitHub est la bonne version : `git restore nomDuFichier` puis `git pull` |
| `untracked working tree files would be overwritten` | Un fichier local porte le même nom qu'un fichier arrivant de GitHub : le renommer puis `git pull` |
| `Your local changes ... would be overwritten by checkout` | Modifications non commitées qui bloquent le changement de branche : `git stash` → `git checkout ...` → `git stash apply` |
| `no such ref was fetched` | On est encore sur une branche supprimée sur GitHub : `git checkout main` puis `git pull` |
| `cannot delete branch ... used by worktree` | On essaie de supprimer la branche sur laquelle on se trouve : `git checkout main` d'abord |
| Des centaines de fichiers dans « Changements » | Fichiers générés (rapports…) : les ajouter au `.gitignore`, **ne pas valider** |

### Commandes dangereuses (font perdre du travail)

`git clean -fd` · `git reset --hard` · `git restore .` · `git checkout .`

---

## 6. Installer / mettre à jour

```powershell
npm install                                      # installer les librairies du package.json
npx playwright install                           # installer les navigateurs de Playwright
```

Détails de chaque outil → `Mémo-outils.md`
