import { test as base } from '@playwright/test';
import dotenv from 'dotenv';

import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountSuccessPage } from '../pages/AccountSuccessPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountLogoutPage } from '../pages/AccountLogoutPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';

type PageFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    accountSuccessPage: AccountSuccessPage;
    myAccountPage: MyAccountPage;
    loginPage: LoginPage;
    accountLogoutPage: AccountLogoutPage;
    searchResultsPage: SearchResultsPage;
    productPage: ProductPage;
    cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    accountSuccessPage: async ({ page }, use) => {
        await use(new AccountSuccessPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    accountLogoutPage: async ({ page }, use) => {
        await use(new AccountLogoutPage(page));
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

export { expect } from '@playwright/test';