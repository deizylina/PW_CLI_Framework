import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Products API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);

    // ---------------------------------------------------------
    // GET - All Products
    // ---------------------------------------------------------

    test('GET - All Products @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);

        // Verify status 200
        expect(response.status(), 'Products list should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response body is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify the array contains at least one product
        expect(responseBody.length, 'Products array should not be empty').toBeGreaterThan(0);

        // Validate important fields on the first product
        const firstProduct = responseBody[0];
        expect(firstProduct.id, 'Product should have an id').toBeDefined();
        expect(typeof firstProduct.id, 'Product id should be a number').toBe('number');
        expect(firstProduct.title, 'Product should have a title').toBeDefined();
        expect(typeof firstProduct.title, 'Product title should be a string').toBe('string');
        expect(firstProduct.price, 'Product should have a price').toBeDefined();
        expect(typeof firstProduct.price, 'Product price should be a number').toBe('number');
        expect(firstProduct.category, 'Product should have a category').toBeDefined();
        expect(typeof firstProduct.category, 'Product category should be a string').toBe('string');
        expect(firstProduct.image, 'Product should have an image').toBeDefined();
        expect(typeof firstProduct.image, 'Product image should be a string').toBe('string');

        console.log('✅ Get all products test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Product by ID
    // ---------------------------------------------------------

    test('GET - Product by ID @master @regression @api', async ({ request }) => {

        // Replace the {id} path parameter
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        // Verify status 200
        expect(response.status(), 'Product by ID should return 200').toBe(200);

        const product = await response.json();

        // Verify the returned id matches the requested ID
        expect(product.id, 'Returned id should match the requested id').toBe(PRODUCT_ID);

        // Validate the important product properties
        expect(typeof product.title, 'Product should have a title (string)').toBe('string');
        expect(typeof product.price, 'Product should have a price (number)').toBe('number');
        expect(typeof product.description, 'Product should have a description (string)').toBe('string');
        expect(typeof product.category, 'Product should have a category (string)').toBe('string');
        expect(typeof product.image, 'Product should have an image (string)').toBe('string');
        expect(product.rating, 'Product should have a rating object').toBeDefined();

        console.log('✅ Get product by ID test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Products with Limit
    // ---------------------------------------------------------

    test('GET - Products with Limit @master @regression @api', async ({ request }) => {

        // Send a GET request with a predefined limit
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        // Verify status 200
        expect(response.status(), 'Products with limit should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify the returned number of products matches the requested limit
        expect(responseBody.length, 'Product count should match the requested limit').toBe(LIMIT);

        console.log('✅ Get products with limit test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Sort Products (Ascending / Descending)
    // ---------------------------------------------------------

    test('GET - Sort Products Ascending @master @regression @api', async ({ request }) => {

        // Send the request with the ascending sort parameter
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'asc')}`);

        // Verify status 200
        expect(response.status(), 'Sorted products (asc) should return 200').toBe(200);

        const responseBody = await response.json();

        // Extract product IDs
        const ids = responseBody.map((product: { id: number }) => product.id);

        // Verify IDs are in ascending order
        const sortedIds = [...ids].sort((a, b) => a - b);
        expect(ids, 'Product IDs should be in ascending order').toEqual(sortedIds);

        console.log('✅ Sort products ascending test completed successfully!');
    });

    test('GET - Sort Products Descending @master @regression @api', async ({ request }) => {

        // Send the request with the descending sort parameter
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'desc')}`);

        // Verify status 200
        expect(response.status(), 'Sorted products (desc) should return 200').toBe(200);

        const responseBody = await response.json();

        // Extract product IDs
        const ids = responseBody.map((product: { id: number }) => product.id);

        // Verify IDs are in descending order
        const sortedIds = [...ids].sort((a, b) => b - a);
        expect(ids, 'Product IDs should be in descending order').toEqual(sortedIds);

        console.log('✅ Sort products descending test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - All Categories
    // ---------------------------------------------------------

    test('GET - All Categories @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CATEGORIES}`);

        // Verify status 200
        expect(response.status(), 'Categories list should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify the category list is not empty
        expect(responseBody.length, 'Categories array should not be empty').toBeGreaterThan(0);

        console.log('✅ Get all categories test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Products by Category
    // ---------------------------------------------------------

    test('GET - Products by Category @master @regression @api', async ({ request }) => {

        const category = 'electronics';

        // Replace {category} with the selected category
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_BY_CATEGORY.replace('{category}', category)}`);

        // Verify status 200
        expect(response.status(), 'Products by category should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify every returned product has the requested category
        responseBody.forEach((product: { category: string }) => {
            expect(product.category, 'Each product should belong to the requested category').toBe(category);
        });

        console.log('✅ Get products by category test completed successfully!');
    });

    // ---------------------------------------------------------
    // POST - Create Product
    // ---------------------------------------------------------

    test('POST - Create Product @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateProductPayload();

        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: payload });

        // Verify status 201
        expect(createResponse.status(), 'Create product should return 201').toBe(201);

        const created = await createResponse.json();

        // Verify a product ID is returned
        expect(created.id, 'Created product should have an id').toBeDefined();

        // Verify the response contains the submitted product information
        expect(created.title, 'Created product title should match').toBe(payload.title);
        expect(created.price, 'Created product price should match').toBe(payload.price);
        expect(created.category, 'Created product category should match').toBe(payload.category);
        expect(created.description, 'Created product description should match').toBe(payload.description);
        expect(created.image, 'Created product image should match').toBe(payload.image);

        console.log('✅ Create product test completed successfully!');
    });

    // ---------------------------------------------------------
    // PUT - Update Product
    // ---------------------------------------------------------

    test('PUT - Update Product @master @regression @api', async ({ request }) => {

        const updatedPayload = RandomDataUtil.generateUpdatedProductPayload();

        // Select a valid product ID
        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(PRODUCT_ID))}`, {
            data: updatedPayload
        });

        // Verify status 200
        expect(updateResponse.status(), 'Update product should return 200').toBe(200);

        const updated = await updateResponse.json();

        // Verify the response contains the updated values
        expect(updated.title, 'Updated product title should be reflected').toBe(updatedPayload.title);
        expect(updated.price, 'Updated product price should be reflected').toBe(updatedPayload.price);
        expect(updated.category, 'Updated product category should be reflected').toBe(updatedPayload.category);

        // Verify the returned product ID matches the requested ID
        expect(updated.id, 'Returned product id should match the requested id').toBe(PRODUCT_ID);

        console.log('✅ Update product test completed successfully!');
    });

    // ---------------------------------------------------------
    // DELETE - Delete Product
    // ---------------------------------------------------------

    test('DELETE - Delete Product @master @regression @api', async ({ request }) => {

        // Select a valid product ID
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(PRODUCT_ID))}`);

        // Verify status 200
        expect(deleteResponse.status(), 'Delete product should return 200').toBe(200);

        // Validate the response body where the API contract provides one
        const responseBody = await deleteResponse.json();

        // FakeStoreAPI returns the deleted product or an empty object
        expect(responseBody, 'Delete response should contain a body').toBeDefined();

        console.log('✅ Delete product test completed successfully!');
    });
});