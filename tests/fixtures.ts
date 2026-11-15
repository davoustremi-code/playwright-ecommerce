import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthentificationPage } from '../pages/AuthentificationPage';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { CheckoutPage } from '../pages/CheckoutPage';


type Fixtures = {
  HomePage: HomePage;                               // ② type
  AuthentificationPage: AuthentificationPage;       // ② type
  CatalogPage: CatalogPage;                          // ② type
  ProductDetailPage: ProductDetailPage;                          // ② type
  CartPage: CartPage;                          // ② type
  HeaderComponent: HeaderComponent;                          // ② type
  CheckoutPage: CheckoutPage;                          // ② type
};

const test = base.extend<Fixtures>({
  HomePage: async ({ page }, use) => {               // ③ extend
    await use(new HomePage(page));
  },
  AuthentificationPage: async ({ page }, use) => {  // ③ extend
    await use(new AuthentificationPage(page));
  },
  CatalogPage: async ({ page }, use) => {  // ③ extend
    await use(new CatalogPage(page));
  },
  ProductDetailPage: async ({ page }, use) => {  // ③ extend
    await use(new ProductDetailPage(page));
  },
  CartPage: async ({ page }, use) => {  // ③ extend
    await use(new CartPage(page));
  },
  HeaderComponent: async ({ page }, use) => {  // ③ extend
    await use(new HeaderComponent(page));
  },
  CheckoutPage: async ({ page }, use) => {  // ③ extend
    await use(new CheckoutPage(page));
  },
});

const expect = base.expect;

export { test, expect }