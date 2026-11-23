import { Page, Locator } from '@playwright/test';

export class AuthentificationPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly signupTab: Locator;
  readonly loginTab: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupPasswordInput: Locator;
  readonly ConfirmPasswordInput: Locator;
  readonly signupButton: Locator;
  readonly loginButton: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly signupSuccessMessage: Locator;
  readonly notification: Locator;
  readonly loginPasswordErrorMessage: Locator;
  readonly loginEmailErrorMessage: Locator;



  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.signupTab = page.getByTestId('signup-tab');
    this.loginTab = page.getByTestId('login-tab');
    this.signupNameInput = page.getByTestId('signup-name-input');
    this.signupEmailInput = page.getByTestId('signup-email-input');
    this.signupPasswordInput = page.getByTestId('signup-password-input');
    this.ConfirmPasswordInput = page.getByTestId('signup-confirm-password-input');
    this.signupButton = page.getByTestId('signup-submit-button');
    this.loginButton = page.getByTestId('login-submit-button');
    this.loginEmailInput = page.getByTestId('login-email-input');
    this.loginPasswordInput = page.getByTestId('login-password-input');
    this.signupSuccessMessage = page.getByText('Inscription réussie !', { exact: true });
    this.notification = page.getByRole ('region', { name: 'Notifications (F8)' }).getByRole('status');
    this.loginPasswordErrorMessage = page.getByText('Le mot de passe doit contenir au moins 6 caractères', { exact: true });
    this.loginEmailErrorMessage = page.getByText('Adresse email invalide', { exact: true });
  }
  async fillSignupForm(name: string, email: string, password: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupPasswordInput.fill(password);
    await this.ConfirmPasswordInput.fill(password);
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto('/auth');
  }

  async openSignupTab() {
    await this.signupTab.click();
  }

  async openLoginTab() {
    await this.loginTab.click();
  }

  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}