import { Page, Locator } from '@playwright/test';

export class AccountSuccessPage {
    private readonly page: Page;

    // Locators
    private readonly successHeading: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.successHeading = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Checks if the success page heading is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isSuccessPageExists(): Promise<boolean> {
        try {
            return await this.successHeading.isVisible();
        } catch (error) {
            console.log(`Error checking success page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the success page heading text
     * @returns Promise<string> - The heading text
     */
    async getSuccessHeadingText(): Promise<string> {
        return await this.successHeading.textContent() ?? '';
    }

    /**
     * Clicks the Continue button to navigate to the My Account page
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}