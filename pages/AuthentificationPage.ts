import { Page, Locator } from '@playwright/test';

export class AuthentificationPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly inscriptionLink: Locator;
 readonly nameInput: Locator;
 readonly emailInput: Locator;
 readonly passwordInput: Locator;
 readonly ConfirmPasswordInput: Locator;
 readonly signupButton: Locator;
 readonly successMessage: Locator;



  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.inscriptionLink = page.getByTestId('signup-tab');
    this.nameInput = page.getByTestId('signup-name-input');
    this.emailInput = page.getByTestId('signup-email-input');
    this.passwordInput = page.getByTestId('signup-password-input');
    this.ConfirmPasswordInput = page.getByTestId('signup-confirm-password-input');
    this.signupButton = page.getByTestId('signup-submit-button');
    this.successMessage = page.getByText('Inscription réussie !', { exact: true });
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

  async inscription() {
    await this.inscriptionLink.click();
  }

  async submitSignupForm() {
    await this.signupButton.click();
  }
}