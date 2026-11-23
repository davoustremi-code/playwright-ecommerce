import { test, expect } from './fixtures';


test.describe('Connexion / Inscription @P1', () => {

    test.beforeEach(async ({ AuthentificationPage }) => {
        await AuthentificationPage.goto();
        await expect(AuthentificationPage.page).toHaveURL(/auth/);
    });

    test ('Bascule entre les onglets Connexion et Inscription', async ({ AuthentificationPage }) => {

        await test.step('Vérifie que l\'onglet Connexion est actif par défaut', async () => {
            await expect(AuthentificationPage.loginTab).toHaveAttribute('aria-selected', 'true');
        });

        await test.step('Vérifie que l\'onglet Inscription peut être sélectionné', async () => {
            await AuthentificationPage.openSignupTab();
            await expect(AuthentificationPage.signupTab).toHaveAttribute('aria-selected', 'true');
            await expect(AuthentificationPage.loginTab).toHaveAttribute('aria-selected', 'false');
            await expect(AuthentificationPage.signupButton).toBeVisible();
        });

        await test.step('Vérifie que l\'onglet Connexion peut être sélectionné après avoir sélectionné Inscription', async () => {
            await AuthentificationPage.openLoginTab();
            await expect(AuthentificationPage.loginTab).toHaveAttribute('aria-selected', 'true');
            await expect(AuthentificationPage.signupTab).toHaveAttribute('aria-selected', 'false');
            await expect(AuthentificationPage.loginButton).toBeVisible();
        });
    });

    test ('Connexion avec identifiants valides', async ({ AuthentificationPage }) => {

        await test.step('Connexion avec identifiants valides', async () => {
            await AuthentificationPage.login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
        });

        await test.step('Vérifie que l\'utilisateur est bien connecté avec le retour sur la page d\'accueil', async () => {
            await expect(AuthentificationPage.notification).toContainText('Connexion réussie');
            await expect(AuthentificationPage.page).toHaveURL(process.env.URL!);
        });
    });

    test ('Connexion avec mauvais mot de passe', async ({ AuthentificationPage }) => {

        await test.step('Connexion avec mauvais mot de passe', async () => {
            await AuthentificationPage.login(process.env.LOGIN_EMAIL!, 'wrongpassword');
        });

        await test.step('Vérifie que l\'utilisateur ne peut pas se connecter', async () => {
            await expect(AuthentificationPage.notification).toContainText('Erreur de connexion');
            await expect(AuthentificationPage.page).toHaveURL(/auth/);
        });
    });

    test ('Connexion avec des champs vides', async ({ AuthentificationPage }) => {

        await test.step('Connexion avec un champ vide', async () => {
            await AuthentificationPage.login('', '');
        });

        await test.step('Vérifier les message d\'erreurs relatifs au champs vides correspondent', async () => {
            await expect(AuthentificationPage.loginPasswordErrorMessage).toBeVisible();
            await expect(AuthentificationPage.loginEmailErrorMessage).toBeVisible();
            await expect(AuthentificationPage.page).toHaveURL(/auth/);
        });
    });

});