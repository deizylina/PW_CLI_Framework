/**
 * Test Case: Valid Login Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to My Account → Login
 * 3) Verify that the login page is displayed
 * 4) Enter valid customer credentials from test data
 * 5) Submit the login form
 * 6) Verify successful authentication
 * 7) Verify the account dashboard is visible
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Valid Login Flow @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Open the application', async () => {
        // Already navigated via homePage fixture
        console.log('Navigated to application URL');
    });

    await test.step('2) Navigate to My Account → Login', async () => {
        await homePage.navigateToLogin();
    });

    await test.step('3) Verify that the login page is displayed', async () => {
        const isVisible = await loginPage.isLoginPageExists();
        expect(isVisible).toBeTruthy();
    });

    await test.step('4) Enter valid customer credentials', async () => {
        await loginPage.setEmail(email);
        await loginPage.setPassword(password);
    });

    await test.step('5) Submit the login form', async () => {
        await loginPage.clickLogin();
    });

    await test.step('6) Verify successful authentication and My Account dashboard', async () => {
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();
    });

    console.log('✅ Valid Login Flow completed successfully!');
});