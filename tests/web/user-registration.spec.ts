/**
 * Test Case: User Registration Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to My Account → Register
 * 3) Verify that the registration page is displayed
 * 4) Generate unique customer data and fill the registration form
 * 5) Accept privacy policy
 * 6) Submit the registration form
 * 7) Verify registration success message "Your Account Has Been Created!"
 * 8) Verify navigation to My Account page
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User Registration Flow @master @sanity @regression @web', async ({ homePage, registerPage, accountSuccessPage, myAccountPage }) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword();

    await test.step('1) Open the application', async () => {
        // Already navigated via homePage fixture
        console.log(`Navigated to application URL`);
    });

    await test.step('2) Navigate to My Account → Register', async () => {
        await homePage.navigateToRegister();
    });

    await test.step('3) Verify that the registration page is displayed', async () => {
        const isVisible = await registerPage.isRegisterPageExists();
        expect(isVisible).toBeTruthy();
    });

    await test.step('4) Fill the registration form with valid values', async () => {
        await registerPage.setFirstName(firstName);
        await registerPage.setLastName(lastName);
        await registerPage.setEmail(email);
        await registerPage.setTelephone(telephone);
        await registerPage.setPassword(password);
        await registerPage.setPasswordConfirm(password);
    });

    await test.step('5) Accept the Privacy Policy', async () => {
        await registerPage.acceptPrivacyPolicy();
    });

    await test.step('6) Submit the registration form', async () => {
        await registerPage.clickContinue();
    });

    await test.step('7) Verify the account-created confirmation message', async () => {
        const isSuccess = await accountSuccessPage.isSuccessPageExists();
        expect(isSuccess).toBeTruthy();

        const headingText = await accountSuccessPage.getSuccessHeadingText();
        expect(headingText).toContain('Your Account Has Been Created!');
    });

    await test.step('8) Verify navigation to My Account page', async () => {
        await accountSuccessPage.clickContinue();
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();
    });

    console.log('✅ User Registration Flow completed successfully!');
});