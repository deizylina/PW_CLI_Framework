import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly cartHeading: Locator;
    private readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.cartHeading = page.locator('#content h1').first();
        this.cartItems = page.locator('.table-bordered tbody tr');
    }

    /**
     * Checks if the Shopping Cart page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            await this.cartHeading.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking cart page: ${error}`);
            return false;
        }
    }

    /**
     * Checks if a product is present in the cart
     * @param productName - Product name to find
     * @returns Promise<boolean> - true if the product is in the cart
     */
    async isProductInCart(productName: string): Promise<boolean> {
        try {
            const tableBody = this.page.locator('.table-bordered tbody');
            const productLink = tableBody.locator('td').filter({ hasText: productName });
            return await productLink.first().isVisible();
        } catch (error) {
            console.log(`Error checking product in cart: ${error}`);
            return false;
        }
    }

    /**
     * Gets the quantity displayed for a product in the cart
     * @param productName - Product name
     * @returns Promise<string> - The quantity value
     */
    async getProductQuantity(productName: string): Promise<string> {
        try {
            const row = this.page.locator('.table-bordered tbody tr').filter({ hasText: productName });
            const qtyInput = row.locator('input[type="text"]');
            return await qtyInput.inputValue();
        } catch (error) {
            console.log(`Error getting product quantity: ${error}`);
            return '';
        }
    }

    /**
     * Gets the unit price text for a product
     * @param productName - Product name
     * @returns Promise<string> - The unit price text
     */
    async getProductUnitPrice(productName: string): Promise<string> {
        try {
            const row = this.page.locator('.table-bordered tbody tr').filter({ hasText: productName });
            const cells = row.locator('td');
            const count = await cells.count();
            // Unit price is usually the 2nd-to-last td (price column)
            return await cells.nth(count - 2).textContent() ?? '';
        } catch (error) {
            console.log(`Error getting product price: ${error}`);
            return '';
        }
    }

    /**
     * Gets the total price text for a product
     * @param productName - Product name
     * @returns Promise<string> - The total price text
     */
    async getProductTotal(productName: string): Promise<string> {
        try {
            const row = this.page.locator('.table-bordered tbody tr').filter({ hasText: productName });
            const cells = row.locator('td');
            return await cells.last().textContent() ?? '';
        } catch (error) {
            console.log(`Error getting product total: ${error}`);
            return '';
        }
    }

    /**
     * Gets the cart grand total from the totals table
     * @returns Promise<string> - The grand total text
     */
    async getCartGrandTotal(): Promise<string> {
        try {
            const totalsTable = this.page.locator('.table-bordered').last();
            const rows = totalsTable.locator('tr');
            const lastRowText = await rows.last().textContent() ?? '';
            return lastRowText.trim();
        } catch (error) {
            console.log(`Error getting cart grand total: ${error}`);
            return '';
        }
    }
}