import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Users API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);

    // ---------------------------------------------------------
    // GET - All Users
    // ---------------------------------------------------------

    test('GET - All Users @master @sanity @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_USERS}`);

        // Verify status 200
        expect(response.status(), 'Users list should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify the array is not empty
        expect(responseBody.length, 'Users array should not be empty').toBeGreaterThan(0);

        console.log('✅ Get all users test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - User by ID
    // ---------------------------------------------------------

    test('GET - User by ID @master @regression @api', async ({ request }) => {

        // Replace {id} with a valid user ID
        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        // Verify status 200
        expect(response.status(), 'User by ID should return 200').toBe(200);

        const user = await response.json();

        // Verify the returned user ID matches the requested ID
        expect(user.id, 'Returned user id should match the requested id').toBe(USER_ID);

        // Validate important user fields
        expect(typeof user.email, 'User should have an email (string)').toBe('string');
        expect(typeof user.username, 'User should have a username (string)').toBe('string');
        expect(typeof user.password, 'User should have a password (string)').toBe('string');
        expect(typeof user.name, 'User should have a name object').toBe('object');
        expect(typeof user.address, 'User should have an address object').toBe('object');
        expect(typeof user.phone, 'User should have a phone (string)').toBe('string');

        console.log('✅ Get user by ID test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Users with Limit
    // ---------------------------------------------------------

    test('GET - Users with Limit @master @regression @api', async ({ request }) => {

        // Send a GET request with a predefined limit
        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        // Verify status 200
        expect(response.status(), 'Users with limit should return 200').toBe(200);

        const responseBody = await response.json();

        // Verify the response is an array
        expect(Array.isArray(responseBody), 'Response should be an array').toBeTruthy();

        // Verify the returned user count matches the requested limit
        expect(responseBody.length, 'User count should match the requested limit').toBe(LIMIT);

        console.log('✅ Get users with limit test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Sort Users (Ascending / Descending)
    // ---------------------------------------------------------

    test('GET - Sort Users Ascending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', 'asc')}`);

        // Verify status 200
        expect(response.status(), 'Sorted users (asc) should return 200').toBe(200);

        const responseBody = await response.json();

        // Extract user IDs
        const ids = responseBody.map((user: { id: number }) => user.id);

        // Verify the IDs follow the ascending order
        const sortedIds = [...ids].sort((a, b) => a - b);
        expect(ids, 'User IDs should be in ascending order').toEqual(sortedIds);

        console.log('✅ Sort users ascending test completed successfully!');
    });

    test('GET - Sort Users Descending @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', 'desc')}`);

        // Verify status 200
        expect(response.status(), 'Sorted users (desc) should return 200').toBe(200);

        const responseBody = await response.json();

        // Extract user IDs
        const ids = responseBody.map((user: { id: number }) => user.id);

        // Verify the IDs follow the descending order
        const sortedIds = [...ids].sort((a, b) => b - a);
        expect(ids, 'User IDs should be in descending order').toEqual(sortedIds);

        console.log('✅ Sort users descending test completed successfully!');
    });

    // ---------------------------------------------------------
    // POST - Create User
    // ---------------------------------------------------------

    test('POST - Create User @master @regression @api', async ({ request }) => {

        const payload = RandomDataUtil.generateUserPayload();

        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: payload });

        // Verify status 201
        expect(createResponse.status(), 'Create user should return 201').toBe(201);

        const created = await createResponse.json();

        // Verify a generated user ID is returned
        expect(created.id, 'Created user should have an id').toBeDefined();
        expect(typeof created.id, 'Created user id should be a number').toBe('number');

        console.log('✅ Create user test completed successfully!');
    });

    // ---------------------------------------------------------
    // PUT - Update User
    // ---------------------------------------------------------

    test('PUT - Update User @master @regression @api', async ({ request }) => {

        const updatePayload = RandomDataUtil.generateUserUpdatePayload();

        // Select a valid user ID
        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(USER_ID))}`, {
            data: updatePayload
        });

        // Verify status 200
        expect(updateResponse.status(), 'Update user should return 200').toBe(200);

        const updated = await updateResponse.json();

        // Verify the response contains the updated values
        expect(updated.username, 'Updated user username should be reflected').toBe(updatePayload.username);
        expect(updated.email, 'Updated user email should be reflected').toBe(updatePayload.email);
        expect(updated.firstname, 'Updated user firstname should be reflected').toBe(updatePayload.firstname);

        console.log('✅ Update user test completed successfully!');
    });

    // ---------------------------------------------------------
    // DELETE - Delete User
    // ---------------------------------------------------------

    test('DELETE - Delete User @master @regression @api', async ({ request }) => {

        // Select a valid user ID
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(USER_ID))}`);

        // Verify status 200
        expect(deleteResponse.status(), 'Delete user should return 200').toBe(200);

        // Validate the response body where applicable
        const responseBody = await deleteResponse.json();
        expect(responseBody, 'Delete response should contain a body').toBeDefined();

        console.log('✅ Delete user test completed successfully!');
    });
});