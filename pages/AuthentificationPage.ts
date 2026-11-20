import { Page, Locator } from '@playwright/test';

export class AuthentificationPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly signupTab: Locator;
  readonly loginTab: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly ConfirmPasswordInput: Locator;
  readonly signupButton: Locator;
  readonly loginButton: Locator;
  readonly signupSuccessMessage: Locator;



  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.signupTab = page.getByTestId('signup-tab');
    this.loginTab = page.getByTestId('login-tab');
    this.nameInput = page.getByTestId('signup-name-input');
    this.emailInput = page.getByTestId('signup-email-input');
    this.passwordInput = page.getByTestId('signup-password-input');
    this.ConfirmPasswordInput = page.getByTestId('signup-confirm-password-input');
    this.signupButton = page.getByTestId('signup-submit-button');
    this.loginButton = page.getByTestId('login-submit-button');
    this.signupSuccessMessage = page.getByText('Inscription réussie !', { exact: true });
  }

  async fillSignupForm(name: string, email: string, password: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
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

  async login() {
    await this.loginButton.click();
  }
}