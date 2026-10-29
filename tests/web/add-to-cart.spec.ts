/**
 * Test Case: Add Product to Cart
 *
 * Tags: @master @regression @web
 *
 * Steps:
 * 1) Open the application
 * 2) Search for a known product
 * 3) Open the product details page
 * 4) Verify the product details are displayed
 * 5) Set the required quantity
 * 6) Click Add to Cart
 * 7) Verify the success confirmation message
 * 8) Open the shopping cart
 * 9) Verify the selected product is present
 * 10) Verify the displayed quantity matches the requested quantity
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

const PRODUCT_NAME = 'iPhone';
const QUANTITY = '2';

test('Add Product to Cart @master @regression @web', async ({ homePage, searchResultsPage, productPage, cartPage }) => {

    await test.step('1) Open the application', async () => {
        console.log('Navigated to application URL');
    });

    await test.step('2) Search for a known product', async () => {
        await homePage.searchForProduct(PRODUCT_NAME);
    });

    await test.step('3) Open the product details page', async () => {
        await searchResultsPage.clickProduct(PRODUCT_NAME);
    });

    await test.step('4) Verify the product details are displayed', async () => {
        const isProductPage = await productPage.isProductPageExists();
        expect(isProductPage).toBeTruthy();

        const productName = await productPage.getProductName();
        expect(productName).toContain(PRODUCT_NAME);
    });

    await test.step('5) Set the required quantity', async () => {
        await productPage.setQuantity(QUANTITY);
    });

    await test.step('6) Click Add to Cart', async () => {
        await productPage.clickAddToCart();
    });

    await test.step('7) Verify the success confirmation message', async () => {
        const isSuccess = await productPage.isSuccessAlertVisible();
        expect(isSuccess).toBeTruthy();

        const successText = await productPage.getSuccessAlertText();
        expect(successText).toContain('Success');
        expect(successText).toContain(PRODUCT_NAME);
    });

    await test.step('8) Open the shopping cart', async () => {
        await productPage.openCart();
    });

    await test.step('9) Verify the selected product is present in the cart', async () => {
        const isInCart = await cartPage.isProductInCart(PRODUCT_NAME);
        expect(isInCart).toBeTruthy();
    });

    await test.step('10) Verify the displayed quantity matches the requested quantity', async () => {
        const cartQuantity = await cartPage.getProductQuantity(PRODUCT_NAME);
        expect(cartQuantity).toBe(QUANTITY);
    });

    console.log('✅ Add Product to Cart completed successfully!');
});