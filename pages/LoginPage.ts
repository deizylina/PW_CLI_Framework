import { Page, Locator } from '@playwright/test';
import { MyAccountPage } from './MyAccountPage';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly pageHeading: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly alertWarning: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.pageHeading = page.getByRole('heading', { name: 'Returning Customer' });
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator('input[value="Login"]');
        this.alertWarning = page.locator('.alert-danger');
    }

    /**
     * Checks if the Login page is displayed
     * @returns Promise<boolean> - true if the page heading is visible
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            return await this.pageHeading.isVisible();
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }

    /**
     * Sets the E-Mail field
     * @param email - Email value
     */
    async setEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    /**
     * Sets the Password field
     * @param password - Password value
     */
    async setPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Clicks the Login button to submit the login form
     * @returns Promise<MyAccountPage> - Instance of the My Account page
     */
    async clickLogin(): Promise<MyAccountPage> {
        await this.loginButton.click();
        return new MyAccountPage(this.page);
    }

    /**
     * Performs login with the provided credentials
     * @param email - Email address
     * @param password - Password
     * @returns Promise<void>
     */
    async login(email: string, password: string): Promise<void> {
        try {
            await this.setEmail(email);
            await this.setPassword(password);
            await this.loginButton.click();
        } catch (error) {
            console.log(`Error during login: ${error}`);
            throw error;
        }
    }

    /**
     * Gets the warning/error alert text displayed after failed login
     * @returns Promise<string> - The warning message text
     */
    async getWarningText(): Promise<string> {
        try {
            return await this.alertWarning.textContent() ?? '';
        } catch (error) {
            console.log(`Error getting warning text: ${error}`);
            return '';
        }
    }

    /**
     * Checks if the warning/error alert is displayed
     * @returns Promise<boolean> - true if the warning is visible
     */
    async isWarningVisible(): Promise<boolean> {
        try {
            return await this.alertWarning.isVisible();
        } catch (error) {
            console.log(`Error checking warning visibility: ${error}`);
            return false;
        }
    }
}