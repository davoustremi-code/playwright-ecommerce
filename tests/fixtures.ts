import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthentificationPage } from '../pages/AuthentificationPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';


type Fixtures = {
  HomePage: HomePage;                               // ② type
  AuthentificationPage: AuthentificationPage;       // ② type
  ProductsPage: ProductsPage;                          // ② type
  ProductPage: ProductPage;                          // ② type
  CartPage: CartPage;                          // ② type
};

const test = base.extend<Fixtures>({
  HomePage: async ({ page }, use) => {               // ③ extend
    await use(new HomePage(page));
  },
  AuthentificationPage: async ({ page }, use) => {  // ③ extend
    await use(new AuthentificationPage(page));
  },
  ProductsPage: async ({ page }, use) => {  // ③ extend
    await use(new ProductsPage(page));
  },
  ProductPage: async ({ page }, use) => {  // ③ extend
    await use(new ProductPage(page));
  },
  CartPage: async ({ page }, use) => {  // ③ extend
    await use(new CartPage(page));
  },
  

});

const expect = base.expect;

export { test, expect }