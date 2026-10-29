import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

// override: true ensures the .env values win over any OS-level variables
// (e.g. USERNAME is a reserved Windows environment variable)
dotenv.config({ override: true });

test.describe('Authentication API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USERNAME = process.env.USERNAME || 'mor_2314';
    const PASSWORD = process.env.PASSWORD || '83r5^_';

    // ---------------------------------------------------------
    // POST - Login
    // ---------------------------------------------------------

    test('POST - Login with valid credentials @master @sanity @api', async ({ request }) => {

        // Send a POST request with valid username and password
        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: {
                username: USERNAME,
                password: PASSWORD
            }
        });

        // Verify status code 201
        expect(response.status(), 'Login with valid credentials should return 201').toBe(201);

        // Parse the JSON response
        const responseBody = await response.json();

        // Verify that token exists
        expect(responseBody.token, 'Response should contain a token').toBeDefined();

        // Verify that token is a non-empty string
        expect(typeof responseBody.token, 'Token should be a string').toBe('string');
        expect(responseBody.token.length, 'Token should be non-empty').toBeGreaterThan(0);

        console.log('✅ Login API test completed successfully!');
    });

    test('POST - Login with invalid credentials @master @regression @api', async ({ request }) => {

        // Generate invalid username and password
        const invalidPayload = RandomDataUtil.generateInvalidLoginPayload();

        // Send a POST request with invalid credentials
        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: invalidPayload
        });

        // Verify status code 401
        expect(response.status(), 'Login with invalid credentials should return 401').toBe(401);

        // The FakeStoreAPI returns the error as plain text, so read the text body
        const responseBody = await response.text();

        // Verify the error message
        expect(responseBody, 'Error message should match').toBe('username or password is incorrect');

        console.log('✅ Invalid login API test completed successfully!');
    });
});