/**
 * Test Case: Invalid Login Flow
 *
 * Tags: @master @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to My Account → Login
 * 3) Enter invalid email and password
 * 4) Submit the form
 * 5) Verify that authentication fails
 * 6) Verify the warning/error message
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Invalid Login Flow @master @regression @web', async ({ homePage, loginPage }) => {
    const invalidEmail = RandomDataUtil.getEmail();
    const invalidPassword = RandomDataUtil.getPassword();

    await test.step('1) Open the application', async () => {
        console.log('Navigated to application URL');
    });

    await test.step('2) Navigate to My Account → Login', async () => {
        await homePage.navigateToLogin();
    });

    await test.step('3) Enter invalid credentials', async () => {
        await loginPage.setEmail(invalidEmail);
        await loginPage.setPassword(invalidPassword);
    });

    await test.step('4) Submit the login form', async () => {
        await loginPage.clickLogin();
    });

    await test.step('5) Verify that authentication fails and warning is displayed', async () => {
        const isWarningVisible = await loginPage.isWarningVisible();
        expect(isWarningVisible).toBeTruthy();

        const warningText = await loginPage.getWarningText();
        expect(warningText).toContain('Warning: No match for E-Mail Address and/or Password.');
    });

    await test.step('6) Verify that the customer is not authenticated', async () => {
        const isLoginPageStill = await loginPage.isLoginPageExists();
        expect(isLoginPageStill).toBeTruthy();
    });

    console.log('✅ Invalid Login Flow completed successfully!');
});