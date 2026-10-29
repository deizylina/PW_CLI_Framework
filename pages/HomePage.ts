import { Page } from '@playwright/test';
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { SearchResultsPage } from './SearchResultsPage';

export class HomePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the Register Account page via direct URL
     * @returns Promise<RegisterPage> - Instance of the Register page
     */
    async navigateToRegister(): Promise<RegisterPage> {
        const appUrl = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';
        await this.page.goto(appUrl + 'index.php?route=account/register');
        return new RegisterPage(this.page);
    }

    /**
     * Navigates to the Login page via direct URL
     * @returns Promise<LoginPage> - Instance of the Login page
     */
    async navigateToLogin(): Promise<LoginPage> {
        const appUrl = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';
        await this.page.goto(appUrl + 'index.php?route=account/login');
        return new LoginPage(this.page);
    }

    /**
     * Searches for a product using the search field and submits
     * @param productName - Product name to search for
     * @returns Promise<SearchResultsPage> - Instance of the Search Results page
     */
    async searchForProduct(productName: string): Promise<SearchResultsPage> {
        await this.page.locator('input[name="search"]').fill(productName);
        await this.page.locator('button.btn-default.btn-lg').click();
        return new SearchResultsPage(this.page);
    }
}