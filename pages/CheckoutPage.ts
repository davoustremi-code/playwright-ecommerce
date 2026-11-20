import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  // 1. Propriétés : la page + les locators
  readonly page: Page;
  readonly ShippingFirstNameImput: Locator;
  readonly ShippingLastNameImput: Locator;
  readonly ShippingMailInput: Locator;
  readonly ShippingPhoneInput: Locator;
  readonly ShippingAddressInput: Locator;
  readonly ShippingCityInput: Locator;
  readonly ShippingPostalCodeInput: Locator;
  readonly ShippingSubmitButton: Locator;
  readonly PaymentCardNumberInput: Locator;
  readonly PaymentCardNameInput: Locator;
  readonly PaymentExpirationDateInput: Locator;
  readonly PaymentCvvInput: Locator;
  readonly PaymentSubmitButton: Locator;
  readonly OrderConfirmationCard: Locator;
  readonly OrderNumber: Locator;

  // 2. Constructeur : on définit les locators
  constructor(page: Page) {
    this.page = page;
    this.ShippingFirstNameImput = page.getByTestId('shipping-firstname-input');
    this.ShippingLastNameImput = page.getByTestId('shipping-lastname-input');
    this.ShippingMailInput = page.getByTestId('shipping-email-input');
    this.ShippingPhoneInput = page.getByTestId('shipping-phone-input');
    this.ShippingAddressInput = page.getByTestId('shipping-address-input');
    this.ShippingCityInput = page.getByTestId('shipping-city-input');
    this.ShippingPostalCodeInput = page.getByTestId('shipping-postalcode-input');
    this.ShippingSubmitButton = page.getByTestId('shipping-submit-button');
    this.PaymentCardNumberInput = page.getByTestId('payment-cardnumber-input');
    this.PaymentCardNameInput = page.getByTestId('payment-cardname-input');
    this.PaymentExpirationDateInput = page.getByTestId('payment-expiry-input');
    this.PaymentCvvInput = page.getByTestId('payment-cvv-input');
    this.PaymentSubmitButton = page.getByTestId('payment-submit-button');
    this.OrderConfirmationCard = page.getByTestId('order-confirmation-card');
    this.OrderNumber = page.getByTestId('order-number');
  }

  // 3. Méthodes : les actions
  async goto() {
    await this.page.goto('/checkout');
  
  }
  async fillFirstName(firstName: string) {
    await this.ShippingFirstNameImput.fill(firstName);
  }
  async fillLastName(lastName: string) {
    await this.ShippingLastNameImput.fill(lastName);
  }
  async fillMail(mail: string) {
    await this.ShippingMailInput.fill(mail);
  }
  async fillPhone(phone: string) {
    await this.ShippingPhoneInput.fill(phone);
  }
  async fillAddress(address: string) {
    await this.ShippingAddressInput.fill(address);
  }
  async fillCity(city: string) {
    await this.ShippingCityInput.fill(city);
  }
  async fillPostaleCode(postaleCode: string) {
    await this.ShippingPostalCodeInput.fill(postaleCode);
  }
  async placeOrder() {
    await this.ShippingSubmitButton.click();
  }

  async fillPaymentCardNumber(cardNumber: string) {
    await this.PaymentCardNumberInput.fill(cardNumber);
  }
  async fillPaymentCardName(cardName: string) {
    await this.PaymentCardNameInput.fill(cardName);
  }

  async fillPaymentExpirationDate(expirationDate: string) {
    await this.PaymentExpirationDateInput.fill(expirationDate);
  }

  async fillPaymentCvc(cvc: string) {
    await this.PaymentCvvInput.fill(cvc);
  }
  async submitPayment() {
    await this.PaymentSubmitButton.click();
  }
}