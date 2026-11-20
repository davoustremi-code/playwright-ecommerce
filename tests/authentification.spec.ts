import { test, expect } from './fixtures';


test.describe('Connexion / Inscription @P1', () => {

test ('test switch connexion / inscription', async ({ AuthentificationPage }) => {

    await test.step('Ouverture de la page d\'authentification', async () => {
        await AuthentificationPage.goto();
        await expect(AuthentificationPage.page).toHaveURL(/auth/);
    });

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
});