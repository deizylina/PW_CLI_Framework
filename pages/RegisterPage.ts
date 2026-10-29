import { Page, Locator } from '@playwright/test';
import { AccountSuccessPage } from './AccountSuccessPage';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly pageHeading: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly passwordConfirmInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.pageHeading = page.getByRole('heading', { name: 'Register Account' });
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.telephoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.passwordConfirmInput = page.locator('#input-confirm');
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    /**
     * Checks if the Register Account page is displayed
     * @returns Promise<boolean> - true if the page heading is visible
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            return await this.pageHeading.isVisible();
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }

    /**
     * Sets the First Name field
     * @param firstName - First name value
     */
    async setFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Sets the Last Name field
     * @param lastName - Last name value
     */
    async setLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Sets the E-Mail field
     * @param email - Email value
     */
    async setEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    /**
     * Sets the Telephone field
     * @param telephone - Telephone value
     */
    async setTelephone(telephone: string): Promise<void> {
        await this.telephoneInput.fill(telephone);
    }

    /**
     * Sets the Password field
     * @param password - Password value
     */
    async setPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Sets the Password Confirm field
     * @param password - Password confirm value
     */
    async setPasswordConfirm(password: string): Promise<void> {
        await this.passwordConfirmInput.fill(password);
    }

    /**
     * Checks the Privacy Policy checkbox
     */
    async acceptPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyCheckbox.check();
    }

    /**
     * Clicks the Continue button to submit the registration form
     * @returns Promise<AccountSuccessPage> - Instance of the success page
     */
    async clickContinue(): Promise<AccountSuccessPage> {
        await this.continueButton.click();
        return new AccountSuccessPage(this.page);
    }

    /**
     * Completes the full registration form with all provided details
     * @param firstName - First name
     * @param lastName - Last name
     * @param email - Email address
     * @param telephone - Telephone number
     * @param password - Password
     */
    async completeRegistration(firstName: string, lastName: string, email: string, telephone: string, password: string): Promise<AccountSuccessPage> {
        try {
            await this.setFirstName(firstName);
            await this.setLastName(lastName);
            await this.setEmail(email);
            await this.setTelephone(telephone);
            await this.setPassword(password);
            await this.setPasswordConfirm(password);
            await this.acceptPrivacyPolicy();
            return await this.clickContinue();
        } catch (error) {
            console.log(`Error completing registration: ${error}`);
            throw error;
        }
    }
}