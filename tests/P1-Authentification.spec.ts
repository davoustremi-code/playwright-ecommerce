import { test, expect } from './fixtures';

test ('test connexion / inscription', async ({ AuthentificationPage }) => {

    await test.step('Bascule entre les onglets Connexion et Inscription', async () => {
        await AuthentificationPage.goto();
        await expect(AuthentificationPage.page).toHaveURL(/auth/);
    });

});