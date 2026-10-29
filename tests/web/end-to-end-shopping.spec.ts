/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @end-to-end @regression @web
 *
 * Steps:
 * 1) Open the application
 * 2) Register a new customer using dynamically generated data
 * 3) Verify successful registration
 * 4) Log out
 * 5) Log in again using the newly created credentials
 * 6) Verify successful authentication
 * 7) Search for a known product
 * 8) Open the product details page
 * 9) Add the product to the cart
 * 10) Open the shopping cart
 * 11) Verify the correct product
 * 12) Verify the quantity
 * 13) Verify the product price
 * 14) Verify the applicable cart total
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

const PRODUCT_NAME = 'iPhone';
const QUANTITY = '1';

test('End-to-End Shopping Flow @master @end-to-end @regression @web', async ({
    homePage, registerPage, accountSuccessPage, myAccountPage,
    loginPage, accountLogoutPage, searchResultsPage, productPage, cartPage
}) => {
    // Generate unique customer data
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword();

    await test.step('1) Open the application', async () => {
        console.log('Navigated to application URL');
    });

    await test.step('2) Register a new customer', async () => {
        await homePage.navigateToRegister();
        await registerPage.completeRegistration(firstName, lastName, email, telephone, password);
    });

    await test.step('3) Verify successful registration', async () => {
        const isSuccess = await accountSuccessPage.isSuccessPageExists();
        expect(isSuccess).toBeTruthy();
    });

    await test.step('4) Log out', async () => {
        await accountSuccessPage.clickContinue();
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();

        await myAccountPage.logout();
        const isLogoutPage = await accountLogoutPage.isLogoutPageExists();
        expect(isLogoutPage).toBeTruthy();
        await accountLogoutPage.clickContinue();
    });

    await test.step('5) Log in using the newly created credentials', async () => {
        await homePage.navigateToLogin();
        await loginPage.login(email, password);
    });

    await test.step('6) Verify successful authentication', async () => {
        const isMyAccount = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccount).toBeTruthy();
    });

    await test.step('7) Search for a known product', async () => {
        // Navigate to homepage first
        await homePage.navigateToLogin();
        await homePage.searchForProduct(PRODUCT_NAME);
    });

    await test.step('8) Open the product details page', async () => {
        await searchResultsPage.clickProduct(PRODUCT_NAME);
        const isProductPage = await productPage.isProductPageExists();
        expect(isProductPage).toBeTruthy();
    });

    await test.step('9) Add the product to the cart', async () => {
        await productPage.setQuantity(QUANTITY);
        await productPage.clickAddToCart();
        const isSuccess = await productPage.isSuccessAlertVisible();
        expect(isSuccess).toBeTruthy();
    });

    await test.step('10) Open the shopping cart', async () => {
        await productPage.openCart();
        const isCartPage = await cartPage.isCartPageExists();
        expect(isCartPage).toBeTruthy();
    });

    await test.step('11) Verify the correct product is in the cart', async () => {
        const isInCart = await cartPage.isProductInCart(PRODUCT_NAME);
        expect(isInCart).toBeTruthy();
    });

    await test.step('12) Verify the quantity', async () => {
        const cartQuantity = await cartPage.getProductQuantity(PRODUCT_NAME);
        expect(cartQuantity).toBe(QUANTITY);
    });

    await test.step('13) Verify the product price is displayed', async () => {
        const unitPrice = await cartPage.getProductUnitPrice(PRODUCT_NAME);
        expect(unitPrice.length).toBeGreaterThan(0);
    });

    await test.step('14) Verify the applicable cart total', async () => {
        const grandTotal = await cartPage.getCartGrandTotal();
        expect(grandTotal).toContain('Total:');
        expect(grandTotal).toContain('$');
    });

    console.log('✅ End-to-End Shopping Flow completed successfully!');
});