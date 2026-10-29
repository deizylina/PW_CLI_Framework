import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Carts API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const CART_ID = Number(process.env.CART_ID ?? 1);
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);
    const START_DATE = process.env.START_DATE || '2019-12-10';
    const END_DATE = process.env.END_DATE || '2020-10-10';

    // ---------------------------------------------------------
    // GET - All Carts
    // ---------------------------------------------------------

    test('GET - All Carts @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CARTS}`);

        // Verify status 200
        expect(response.status(), 'Carts list should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify the array is not empty
        expect(responseBody.length, 'Carts array should not be empty').toBeGreaterThan(0);

        console.log('✅ Get all carts test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Cart by ID
    // ---------------------------------------------------------

    test('GET - Cart by ID @master @regression @api', async ({ request }) => {

        // Replace {id} with a valid cart ID
        const response = await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`);

        // Verify status 200
        expect(response.status(), 'Cart by ID should return 200').toBe(200);

        const cart = await response.json();

        // Verify the returned cart ID matches the requested ID
        expect(cart.id, 'Returned cart id should match the requested id').toBe(CART_ID);

        // Validate important cart fields
        expect(typeof cart.userId, 'Cart should have a userId (number)').toBe('number');
        expect(typeof cart.date, 'Cart should have a date (string)').toBe('string');
        expect(Array.isArray(cart.products), 'Cart should have a products array').toBeTruthy();

        console.log('✅ Get cart by ID test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Carts by Date Range
    // ---------------------------------------------------------

    test('GET - Carts by Date Range @master @regression @api', async ({ request }) => {

        // Provide valid start and end dates
        const response = await request.get(
            `${BASE_URL}${Routes.GET_CARTS_BY_DATE_RANGE.replace('{startdate}', START_DATE).replace('{enddate}', END_DATE)}`
        );

        // Verify status 200
        expect(response.status(), 'Carts by date range should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify returned cart records fall within the requested date range
        if (responseBody.length > 0) {
            responseBody.forEach((cart: { date: string }) => {
                const cartDate = cart.date.split('T')[0];
                expect(cartDate >= START_DATE, 'Cart date should be after the start date').toBeTruthy();
                expect(cartDate <= END_DATE, 'Cart date should be before the end date').toBeTruthy();
            });
        }

        console.log('✅ Get carts by date range test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - User Cart
    // ---------------------------------------------------------

    test('GET - User Cart @master @regression @api', async ({ request }) => {

        // Provide a valid user ID
        const response = await request.get(`${BASE_URL}${Routes.GET_USER_CART.replace('{userId}', String(USER_ID))}`);

        // Verify status 200
        expect(response.status(), 'User cart should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response contains cart records
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify returned carts belong to the requested user
        if (responseBody.length > 0) {
            responseBody.forEach((cart: { userId: number }) => {
                expect(cart.userId, 'Cart should belong to the requested user').toBe(USER_ID);
            });
        }

        console.log('✅ Get user cart test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Carts with Limit
    // ---------------------------------------------------------

    test('GET - Carts with Limit @master @regression @api', async ({ request }) => {

        // Send a GET request with a predefined limit
        const response = await request.get(`${BASE_URL}${Routes.GET_CARTS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        // Verify status 200
        expect(response.status(), 'Carts with limit should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify the returned cart count matches the requested limit
        expect(responseBody.length, 'Cart count should match the requested limit').toBe(LIMIT);

        console.log('✅ Get carts with limit test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Sort Carts (Ascending / Descending)
    // ---------------------------------------------------------

    test('GET - Sort Carts Ascending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_CARTS_SORTED.replace('{order}', 'asc')}`);

        // Verify status 200
        expect(response.status(), 'Sorted carts (asc) should return 200').toBe(200);

        const responseBody = await response.json();

        // Extract cart IDs
        const ids = responseBody.map((cart: { id: number }) => cart.id);

        // Verify IDs are in ascending order
        const sortedIds = [...ids].sort((a, b) => a - b);
        expect(ids, 'Cart IDs should be in ascending order').toEqual(sortedIds);

        console.log('✅ Sort carts ascending test completed successfully!');
    });

    test('GET - Sort Carts Descending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_CARTS_SORTED.replace('{order}', 'desc')}`);

        // Verify status 200
        expect(response.status(), 'Sorted carts (desc) should return 200').toBe(200);

        const responseBody = await response.json();

        // Extract cart IDs
        const ids = responseBody.map((cart: { id: number }) => cart.id);

        // Verify IDs are in descending order
        const sortedIds = [...ids].sort((a, b) => b - a);
        expect(ids, 'Cart IDs should be in descending order').toEqual(sortedIds);

        console.log('✅ Sort carts descending test completed successfully!');
    });

    // ---------------------------------------------------------
    // POST - Create Cart
    // ---------------------------------------------------------

    test('POST - Create Cart @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateCartPayload(USER_ID);

        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: payload });

        // Verify status 201
        expect(createResponse.status(), 'Create cart should return 201').toBe(201);

        const created = await createResponse.json();

        // Verify a cart ID is returned
        expect(created.id, 'Created cart should have an id').toBeDefined();

        // Verify the response contains the expected user ID and products
        expect(created.userId, 'Created cart userId should match').toBe(USER_ID);
        expect(created.products, 'Created cart should contain the products list').toBeDefined();

        console.log('✅ Create cart test completed successfully!');
    });

    // ---------------------------------------------------------
    // PUT - Update Cart
    // ---------------------------------------------------------

    test('PUT - Update Cart @master @regression @api', async ({ request }) => {

        // Select a valid cart ID
        const payload = RandomDataUtil.generateUpdatedCartPayload(USER_ID);

        // Change at least one product quantity
        payload.products[0].quantity = 5;

        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(CART_ID))}`, {
            data: payload
        });

        // Verify status 200
        expect(updateResponse.status(), 'Update cart should return 200').toBe(200);

        const updated = await updateResponse.json();

        // Verify the response reflects the updated values
        expect(updated.userId, 'Updated cart userId should match').toBe(USER_ID);
        expect(updated.products[0].quantity, 'Cart quantity should reflect the updated value').toBe(5);

        console.log('✅ Update cart test completed successfully!');
    });

    // ---------------------------------------------------------
    // DELETE - Delete Cart
    // ---------------------------------------------------------

    test('DELETE - Delete Cart @master @regression @api', async ({ request }) => {

        // Select a valid cart ID
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(CART_ID))}`);

        // Verify status 200
        expect(deleteResponse.status(), 'Delete cart should return 200').toBe(200);

        // Validate the response body where applicable
        const responseBody = await deleteResponse.json();
        expect(responseBody, 'Delete response should contain a body').toBeDefined();

        console.log('✅ Delete cart test completed successfully!');
    });
});