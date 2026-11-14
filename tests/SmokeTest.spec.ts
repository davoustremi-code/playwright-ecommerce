import { test, expect } from './fixtures';
import { ProductsPage } from '../pages/ProductsPage';
import {faker} from '@faker-js/faker';


test('Test E2E', async ({ HomePage, AuthentificationPage, ProductsPage, ProductPage, CartPage }) => {

    await test.step('Se rendre sur la page accueil', async () => {
        await HomePage.goto();
        await expect(HomePage.page).toHaveURL(process.env.URL!);
    });

    await test.step('Vérifier la présence de l\'icone du profil', async () => {
        await expect(HomePage.profileLink).toBeVisible();
    });

    await test.step('se rendre sur la page authentification ', async () => {
        await HomePage.profile();
        await expect(AuthentificationPage.page).toHaveURL(/auth/);
    });
    await test.step('cliquer sur le bouton inscription', async () => {
        await AuthentificationPage.inscriptionLink.click();
        await expect(AuthentificationPage.nameInput).toBeVisible();
        await expect(AuthentificationPage.emailInput).toBeVisible();
        await expect(AuthentificationPage.passwordInput).toBeVisible();
        await expect(AuthentificationPage.ConfirmPasswordInput).toBeVisible();
        await expect(AuthentificationPage.signupButton).toBeVisible();
    });

    await test.step('Remplir le formulaire dinscription', async () => {
         const password = faker.internet.password();
        await AuthentificationPage.nameInput.fill(faker.person.fullName());
        await AuthentificationPage.emailInput.fill(faker.internet.email());
         await AuthentificationPage.passwordInput.fill(password);
        await AuthentificationPage.ConfirmPasswordInput.fill(password);
        await AuthentificationPage.signupButton.click();
        await expect(AuthentificationPage.successMessage).toBeVisible();
    });

    await test.step('se rendre sur la page produits', async () => {
        await HomePage.goToProducts();
        await expect(ProductsPage.page).toHaveURL(/products/);
    });

    await test.step('choisir un produit', async () => {
        await ProductsPage.chooseProducts();
        await expect(ProductsPage.page).toHaveURL(/product\/4/);
    });

    await test.step('Ajouter le produit au panier', async () => {
        await ProductPage.chooseProduct();
        await expect(ProductPage.CartCount).toBeVisible();
        await expect(ProductPage.productTitle).toBeVisible();
        await expect(ProductPage.priceProduct).toBeVisible();
    });

    await test.step('Vérifier le contenu du panier', async () => {
        await ProductPage.viewCart();
        await expect(CartPage.page).toHaveURL(/cart/);
        await expect(CartPage.productName).toBeVisible();
    });


});