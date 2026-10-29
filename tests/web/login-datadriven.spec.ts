/**
 * Test Case: Login Flow (Data Driven using External File)
 *
 * Tags: @master @datadriven @regression @web
 *
 * Data Source: testdata/opencart_logindata.json
 *
 * For each data row:
 * 1) Open the login page
 * 2) Enter the email and password
 * 3) If a value is blank/whitespace, leave that field empty
 * 4) Submit the login form
 * 5) Validate the result based on expected
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/dataReader';

interface LoginDataRow {
    testName: string;
    email: string;
    password: string;
    expected: string;
}

const loginData: LoginDataRow[] = DataProvider.readJson('./testdata/opencart_logindata.json');

loginData.forEach((data: LoginDataRow, index: number) => {
    test(`Data-Driven Login - ${data.testName} #${index + 1} (${data.expected}) @master @datadriven @regression @web`, async ({ homePage, loginPage, myAccountPage }) => {

        await test.step('1) Open the login page', async () => {
            await homePage.navigateToLogin();
        });

        await test.step('2) Enter credentials', async () => {
            const emailValue = data.email.trim();
            const passwordValue = data.password.trim();

            if (emailValue) {
                await loginPage.setEmail(emailValue);
            }
            if (passwordValue) {
                await loginPage.setPassword(passwordValue);
            }
        });

        await test.step('3) Submit the login form', async () => {
            await loginPage.clickLogin();
        });

        if (data.expected === 'success') {
            await test.step('4) Verify login is successful and My Account page is displayed', async () => {
                const isMyAccount = await myAccountPage.isMyAccountPageExists();
                expect(isMyAccount).toBeTruthy();
            });
        } else {
            await test.step('4) Verify login fails and warning is displayed', async () => {
                const isWarningVisible = await loginPage.isWarningVisible();
                expect(isWarningVisible).toBeTruthy();

                const warningText = await loginPage.getWarningText();
                expect(warningText).toContain('Warning: No match for E-Mail Address and/or Password.');
            });
        }

        console.log(`✅ Data-Driven Login - ${data.testName} completed successfully!`);
    });
});