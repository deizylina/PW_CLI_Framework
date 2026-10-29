import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe.serial('End-to-End CRUD Workflow Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);

    test('Product CRUD Workflow @master @end-to-end @api', async ({ request }) => {

        // 1) Create a product
        const createPayload = RandomDataUtil.generateProductPayload();
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: createPayload });

        // 2) Verify status 201
        expect(createResponse.status(), 'Create product should return 201').toBe(201);
        const created = await createResponse.json();

        // 3) Extract the returned product ID
        const productId = created.id;
        expect(productId, 'Created product should have an id').toBeDefined();

        // 4) Update the same product
        const updatePayload = RandomDataUtil.generateUpdatedProductPayload();
        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(productId))}`, {
            data: updatePayload
        });

        // 5) Verify status 200
        expect(updateResponse.status(), 'Update product should return 200').toBe(200);
        const updated = await updateResponse.json();

        // 6) Verify the updated product values
        expect(updated.title, 'Updated product title should be reflected').toBe(updatePayload.title);
        expect(updated.price, 'Updated product price should be reflected').toBe(updatePayload.price);

        // 7) Delete the same product
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(productId))}`);

        // 8) Verify status 200
        expect(deleteResponse.status(), 'Delete product should return 200').toBe(200);

        console.log('✅ Product CRUD workflow completed successfully!');
    });

    test('User CRUD Workflow @master @end-to-end @api', async ({ request }) => {

        // 1) Create a user
        const createPayload = RandomDataUtil.generateUserPayload();
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: createPayload });

        // 2) Verify status 201
        expect(createResponse.status(), 'Create user should return 201').toBe(201);
        const created = await createResponse.json();

        // 3) Extract the returned user ID
        const userId = created.id;
        expect(userId, 'Created user should have an id').toBeDefined();

        // 4) Update the same user
        const updatePayload = RandomDataUtil.generateUserUpdatePayload();
        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(userId))}`, {
            data: updatePayload
        });

        // 5) Verify status 200
        expect(updateResponse.status(), 'Update user should return 200').toBe(200);
        const updated = await updateResponse.json();

        // 6) Verify the updated user information
        expect(updated.username, 'Updated user username should be reflected').toBe(updatePayload.username);
        expect(updated.email, 'Updated user email should be reflected').toBe(updatePayload.email);

        // 7) Delete the same user
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(userId))}`);

        // 8) Verify status 200
        expect(deleteResponse.status(), 'Delete user should return 200').toBe(200);

        console.log('✅ User CRUD workflow completed successfully!');
    });

    test('Cart CRUD Workflow @master @end-to-end @api', async ({ request }) => {

        // 1) Create a cart
        const createPayload = RandomDataUtil.generateCartPayload(USER_ID);
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: createPayload });

        // 2) Verify status 201
        expect(createResponse.status(), 'Create cart should return 201').toBe(201);
        const created = await createResponse.json();

        // 3) Extract the returned cart ID
        const cartId = created.id;
        expect(cartId, 'Created cart should have an id').toBeDefined();

        // 4) Verify the returned user ID and products list
        expect(created.userId, 'Created cart userId should match').toBe(USER_ID);
        expect(created.products, 'Created cart should contain the products list').toBeDefined();

        // 5) Update the same cart
        const updatePayload = RandomDataUtil.generateUpdatedCartPayload(USER_ID);
        updatePayload.products[0].quantity = 5;
        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(cartId))}`, {
            data: updatePayload
        });

        // 6) Verify status 200
        expect(updateResponse.status(), 'Update cart should return 200').toBe(200);
        const updated = await updateResponse.json();

        // 7) Verify the updated product quantity
        expect(updated.products[0].quantity, 'Cart quantity should reflect the updated value').toBe(5);

        // 8) Delete the same cart
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(cartId))}`);

        // 9) Verify status 200
        expect(deleteResponse.status(), 'Delete cart should return 200').toBe(200);

        console.log('✅ Cart CRUD workflow completed successfully!');
    });
});