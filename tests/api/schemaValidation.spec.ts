import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { DataProvider } from '../../utils/dataReader';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe('JSON Schema Validation Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const CART_ID = Number(process.env.CART_ID ?? 1);

    // Initialize the AJV validator
    const ajv = new Ajv();

    // ---------------------------------------------------------
    // GET - Product Response Schema
    // ---------------------------------------------------------

    test('GET - Product Response Schema @master @regression @api', async ({ request }) => {

        // Retrieve a product
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        // Verify status 200
        expect(response.status(), 'Product by ID should return 200').toBe(200);

        const responseBody = await response.json();

        // Define the expected product JSON schema
        const schema = DataProvider.readJson('./api/schemas/product_api_schema.json');

        // Compile the schema
        const validate = ajv.compile(schema);

        // Validate the response against the schema
        const isValid = validate(responseBody);

        // Fail the test with a useful validation message when the schema does not match
        expect(isValid, `Product response does not match the schema: ${JSON.stringify(validate.errors)}`).toBeTruthy();

        console.log('✅ Product response schema validation test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - User Response Schema
    // ---------------------------------------------------------

    test('GET - User Response Schema @master @regression @api', async ({ request }) => {

        // Retrieve a user
        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        // Verify status 200
        expect(response.status(), 'User by ID should return 200').toBe(200);

        const responseBody = await response.json();

        // Define the expected user JSON schema
        const schema = DataProvider.readJson('./api/schemas/user_api_schema.json');

        // Compile the schema
        const validate = ajv.compile(schema);

        // Validate the response against the schema
        const isValid = validate(responseBody);

        // Fail the test when the response does not conform to the schema
        expect(isValid, `User response does not match the schema: ${JSON.stringify(validate.errors)}`).toBeTruthy();

        console.log('✅ User response schema validation test completed successfully!');
    });

    // ---------------------------------------------------------
    // GET - Cart Response Schema
    // ---------------------------------------------------------

    test('GET - Cart Response Schema @master @regression @api', async ({ request }) => {

        // Retrieve a cart
        const response = await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`);

        // Verify status 200
        expect(response.status(), 'Cart by ID should return 200').toBe(200);

        const responseBody = await response.json();

        // Define the expected cart JSON schema
        const schema = DataProvider.readJson('./api/schemas/cart_api_schema.json');

        // Compile the schema
        const validate = ajv.compile(schema);

        // Validate the response against the schema
        const isValid = validate(responseBody);

        // Fail the test when the response does not conform to the schema
        expect(isValid, `Cart response does not match the schema: ${JSON.stringify(validate.errors)}`).toBeTruthy();

        console.log('✅ Cart response schema validation test completed successfully!');
    });
});