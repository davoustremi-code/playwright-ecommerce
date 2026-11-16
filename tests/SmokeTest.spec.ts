import { test, expect } from './fixtures';
import {fakerFR as faker} from '@faker-js/faker';


test('Test E2E', async ({ HomePage, AuthentificationPage, CatalogPage, ProductDetailPage, CartPage, HeaderComponent, CheckoutPage }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = faker.internet.email().toLowerCase();
    const phone = faker.phone.number();
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const password = faker.internet.password();
    let productPrice: string | null;
    await test.step('Se rendre sur la page accueil', async () => {
        await HomePage.goto();
        await expect(HomePage.page).toHaveURL(process.env.URL!);
    });

    await test.step('Vérifier la présence de l\'icone du profil', async () => {
        await expect(HeaderComponent.profileLink).toBeVisible();
    });

    await test.step('se rendre sur la page authentification ', async () => {
        await HeaderComponent.profile();
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
        await AuthentificationPage.nameInput.fill(fullName);
        await expect(AuthentificationPage.nameInput).toHaveValue(fullName);
        await AuthentificationPage.emailInput.fill(email);
        await expect(AuthentificationPage.emailInput).toHaveValue(email);
        await AuthentificationPage.passwordInput.fill(password);
        await expect(AuthentificationPage.passwordInput).toHaveValue(password);
        await AuthentificationPage.ConfirmPasswordInput.fill(password);
        await expect(AuthentificationPage.ConfirmPasswordInput).toHaveValue(password);
        await AuthentificationPage.signupButton.click();
        await expect(AuthentificationPage.successMessage).toBeVisible();
    });

    await test.step('se rendre sur la page produits', async () => {
        await HeaderComponent.goToProducts();
        await expect(CatalogPage.page).toHaveURL(/products/);
    });

    await test.step('choisir un produit', async () => {
        await CatalogPage.chooseProducts();
        await expect(CatalogPage.page).toHaveURL(/product\/4/);
    });

        
    await test.step('Ajouter le produit au panier', async () => {
        await ProductDetailPage.chooseProduct();
        await expect(ProductDetailPage.CartCount).toBeVisible();
        await expect(ProductDetailPage.productTitle).toBeVisible();
        await expect(ProductDetailPage.priceProduct).toBeVisible();
        productPrice = await ProductDetailPage.priceProduct.textContent();
    });

    await test.step('Vérifier le contenu du panier', async () => {
        await HeaderComponent.goToCart();
        await expect(CartPage.page).toHaveURL(/cart/);
        await expect(CartPage.productName).toBeVisible();
        await expect(CartPage.priceInCart).toContainText(productPrice!);
    });

    await test.step('Aller sur la page paiement au paiement', async () => {
        await CartPage.proceedToCheckout();
        await expect(CheckoutPage.page).toHaveURL(/checkout/);
    });

    await test.step('Remplir les informations de livraison', async () => {
        // Attendre le pré-remplissage de l'e-mail : signale que les données du compte sont chargées (sinon la livraison ne passe pas au paiement)
        await expect(CheckoutPage.ShippingMailInput).toHaveValue(email);
        await CheckoutPage.fillFirstName(firstName);
        await expect(CheckoutPage.ShippingFirstNameImput).toHaveValue(firstName);
        await CheckoutPage.fillLastName(lastName);
        await expect(CheckoutPage.ShippingLastNameImput).toHaveValue(lastName);
        await CheckoutPage.fillPhone(phone);
        await expect(CheckoutPage.ShippingPhoneInput).toHaveValue(phone);
        await CheckoutPage.fillAddress(address);
        await expect(CheckoutPage.ShippingAddressInput).toHaveValue(address);
        await CheckoutPage.fillCity(city);
        await expect(CheckoutPage.ShippingCityInput).toHaveValue(city);
        await CheckoutPage.fillPostaleCode(zipCode);
        await expect(CheckoutPage.ShippingPostalCodeInput).toHaveValue(zipCode);
        await CheckoutPage.placeOrder();
        });

        await test.step('affichage des champs de paiement', async () => {
            await expect(CheckoutPage.PaymentCardNumberInput).toBeVisible();
            await expect(CheckoutPage.PaymentCardNameInput).toBeVisible();
            await expect(CheckoutPage.PaymentExpirationDateInput).toBeVisible();
            await expect(CheckoutPage.PaymentCvvInput).toBeVisible();
            await expect(CheckoutPage.PaymentSubmitButton).toContainText(productPrice!);
        });
    });