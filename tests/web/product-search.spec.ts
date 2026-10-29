/**
 * Test Case: Product Search Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Open the application
 * 2) Search for a known product
 * 3) Submit the search
 * 4) Verify the search results page is displayed
 * 5) Verify the expected product appears in the results
 * 6) Verify the product name matches the search criteria
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Product Search Flow @master @sanity @regression @web', async ({ homePage, searchResultsPage }) => {
    const { productName } = Helper.getProductDetails();

    await test.step('1) Open the application', async () => {
        console.log('Navigated to application URL');
    });

    await test.step('2) Search for a known product', async () => {
        await homePage.searchForProduct(productName);
    });

    await test.step('3) Verify the search results page is displayed', async () => {
        const isResultsPage = await searchResultsPage.isSearchResultsPageExists();
        expect(isResultsPage).toBeTruthy();

        const headingText = await searchResultsPage.getSearchHeadingText();
        expect(headingText).toContain(productName);
    });

    await test.step('4) Verify the expected product appears in the results', async () => {
        const isFound = await searchResultsPage.isProductInResults(productName);
        expect(isFound).toBeTruthy();
    });

    await test.step('5) Verify the product name matches the search criteria', async () => {
        const productNames = await searchResultsPage.getProductNames();
        const matchingProducts = productNames.filter(name => name.trim() === productName);
        expect(matchingProducts.length).toBeGreaterThanOrEqual(1);
    });

    console.log('✅ Product Search Flow completed successfully!');
});