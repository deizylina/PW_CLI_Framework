import { Page, Locator } from '@playwright/test';
import { AccountLogoutPage } from './AccountLogoutPage';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly myAccountHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.myAccountHeading = page.locator('#content h2').first();
    }

    /**
     * Checks if the My Account page is displayed
     * @returns Promise<boolean> - true if the page heading is visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.myAccountHeading.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking my account page: ${error}`);
            return false;
        }
    }

    /**
     * Navigates to the Logout page via My Account dropdown
     * @returns Promise<AccountLogoutPage> - Instance of the Account Logout page
     */
    async logout(): Promise<AccountLogoutPage> {
        await this.page.locator('#top-links a.dropdown-toggle').click();
        await this.page.locator('ul.dropdown-menu.dropdown-menu-right a[href*="route=account/logout"]').click();
        return new AccountLogoutPage(this.page);
    }
}