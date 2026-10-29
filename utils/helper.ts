/*
Create or update a file named helper.ts in the existing folder utils.

Create and export a class named Helper with exactly these static methods:

1.1 convertPriceToNumber(price: string): number
Remove all characters from the input except digits and the decimal point.
Convert the resulting value to a number.
Return the number.

1.2 getProductDetails()
Return exactly this object structure:

productName: "MacBook"
productQuantity: "1"
totalPrice: "$602.00"

1.3 getLoginDetails()
Return exactly this object structure:

email: "pavanol@xyz.com"
password: "test@123"
Expected Result
A utils/helper.ts file exporting the Helper class with the three specified static methods, used for price conversion and fixed test data.


*/
export class Helper { 
    static convertPriceToNumber(price: string): number {
        const numericValue = price.replace(/[^0-9.]/g, '');
        return parseFloat(numericValue);
    }

    static getProductDetails() {
        return {
            productName: "MacBook",
            productQuantity: "1",
            totalPrice: "$602.00"
        };
    }

    static getLoginDetails() {
        return {
            email: "pavanol@xyz.com",
            password: "test@123"
        };
    }
}
