import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly searchHeading: Locator;
    private readonly productLinks: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.searchHeading = page.locator('#content h1').first();
        this.productLinks = page.locator('.product-layout .caption h4 a');
    }

    /**
     * Checks if the search results page is displayed and contains results
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            await this.searchHeading.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the search results heading text
     * @returns Promise<string> - The heading text
     */
    async getSearchHeadingText(): Promise<string> {
        return await this.searchHeading.textContent() ?? '';
    }

    /**
     * Gets the list of product names found in search results
     * @returns Promise<string[]> - Array of product names
     */
    async getProductNames(): Promise<string[]> {
        return await this.productLinks.allTextContents();
    }

    /**
     * Checks if a specific product appears in the search results
     * @param productName - Product name to find
     * @returns Promise<boolean> - true if the product is found
     */
    async isProductInResults(productName: string): Promise<boolean> {
        try {
            const names = await this.getProductNames();
            return names.some(name => name.trim() === productName);
        } catch (error) {
            console.log(`Error finding product in results: ${error}`);
            return false;
        }
    }

    /**
     * Clicks on a product link in the search results to open its details page
     * @param productName - Product name to click
     * @returns Promise<ProductPage> - Instance of the Product page
     */
    async clickProduct(productName: string): Promise<ProductPage> {
        await this.page.locator('.product-layout .caption h4 a').filter({ hasText: productName }).first().click();
        return new ProductPage(this.page);
    }
}