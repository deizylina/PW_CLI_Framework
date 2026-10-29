import { Page, Locator } from '@playwright/test';

export class AccountLogoutPage {
    private readonly page: Page;

    // Locators
    private readonly logoutHeading: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.logoutHeading = page.getByRole('heading', { name: 'Account Logout' });
        this.continueButton = page.locator('a.btn-primary', { hasText: 'Continue' });
    }

    /**
     * Checks if the Account Logout page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            await this.logoutHeading.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking logout page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Continue button to return to the homepage
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}