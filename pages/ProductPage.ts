import { Page, Locator } from '@playwright/test';
import { CartPage } from './CartPage';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly productHeading: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly successAlert: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.productHeading = page.locator('#content h1').first();
        this.quantityInput = page.locator('#input-quantity');
        this.addToCartButton = page.locator('#button-cart');
        this.successAlert = page.locator('.alert.alert-success');
    }

    /**
     * Checks if the product details page is displayed
     * @returns Promise<boolean> - true if the product heading is visible
     */
    async isProductPageExists(): Promise<boolean> {
        try {
            await this.productHeading.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the product name from the page heading
     * @returns Promise<string> - The product name
     */
    async getProductName(): Promise<string> {
        return await this.productHeading.textContent() ?? '';
    }

    /**
     * Sets the product quantity
     * @param quantity - Quantity value
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.quantityInput.fill(quantity);
    }

    /**
     * Clicks the Add to Cart button
     */
    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Checks if the success alert is visible after adding to cart
     * @returns Promise<boolean> - true if the success alert is visible
     */
    async isSuccessAlertVisible(): Promise<boolean> {
        try {
            await this.successAlert.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking success alert: ${error}`);
            return false;
        }
    }

    /**
     * Gets the success alert text
     * @returns Promise<string> - The alert text
     */
    async getSuccessAlertText(): Promise<string> {
        return await this.successAlert.textContent() ?? '';
    }

    /**
     * Adds a product to cart with the specified quantity and validates success
     * @param quantity - Quantity to add
     * @returns Promise<boolean> - true if successfully added
     */
    async addToCart(quantity: string): Promise<boolean> {
        try {
            await this.setQuantity(quantity);
            await this.clickAddToCart();
            const isSuccess = await this.isSuccessAlertVisible();
            if (isSuccess) {
                const alertText = await this.getSuccessAlertText();
                return alertText.includes('Success:');
            }
            return false;
        } catch (error) {
            console.log(`Error adding to cart: ${error}`);
            return false;
        }
    }

    /**
     * Opens the shopping cart page
     * @returns Promise<CartPage> - Instance of the Cart page
     */
    async openCart(): Promise<CartPage> {
        const appUrl = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';
        await this.page.goto(appUrl + 'index.php?route=checkout/cart');
        return new CartPage(this.page);
    }
}