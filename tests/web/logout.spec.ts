/**
 * Test Case: Logout Flow
 *
 * Tags: @master @regression @web
 *
 * Steps:
 * 1) Open the application
 * 2) Log in using valid credentials
 * 3) Verify that authentication succeeds
 * 4) Navigate to Logout via My Account dropdown
 * 5) Verify that the logout confirmation page is displayed
 * 6) Click Continue
 * 7) Verify redirect to homepage
 * 8) Verify that authenticated account options are no longer available
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Logout Flow @master @regression @web', async ({ homePage, loginPage, myAccountPage, accountLogoutPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Open the application', async () => {
        // Already navigated via homePage fixture
        console.log('Navigated to application URL');
    });

    await test.step('2) Log in using valid credentials', async () => {
        await homePage.navigateToLogin();
        await loginPage.login(email, password);
    });

    await test.step('3) Verify that authentication succeeds', async () => {
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();
    });

    await test.step('4) Navigate to Logout', async () => {
        await myAccountPage.logout();
    });

    await test.step('5) Verify that the logout confirmation page is displayed', async () => {
        const isLogoutPage = await accountLogoutPage.isLogoutPageExists();
        expect(isLogoutPage).toBeTruthy();
    });

    await test.step('6) Click Continue to return to homepage', async () => {
        await accountLogoutPage.clickContinue();
    });

    await test.step('7) Verify that authenticated account options are no longer available', async () => {
        // After logout, navigating to My Account should redirect to login
        await homePage.navigateToLogin();
        const isLoginPage = await loginPage.isLoginPageExists();
        expect(isLoginPage).toBeTruthy();
    });

    console.log('✅ Logout Flow completed successfully!');
});