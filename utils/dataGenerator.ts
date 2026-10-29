/*
Create or update a file named dataGenerator.ts in the existing folder utils.

Use the existing @faker-js/faker dependency. Import Faker exactly from:

@faker-js/faker

Create and export a class named RandomDataUtil.

2.1 Person
Implement exactly these static methods:

getFirstName(): string
getLastName(): string
getFullName(): string
getEmail(): string
getPhoneNumber(): string
getUsername(): string
getPassword(length: number = 10): string
getCountry(): string
getState(): string
getCity(): string
getStreet(): string
getStreetAddress(): string
getZipCode(): string
getLatitude(): string
getLongitude(): string
Use the corresponding Faker person, internet, and location APIs.

2.2 Date & Time
Implement exactly these static methods:

getCurrentDate(): string
getRecentDate(days: number = 10): string
getFutureDate(years: number = 1): string
getPastDate(years: number = 1): string
Use ISO date formatting so the returned value is in YYYY-MM-DD format.

2.3 Commerce
Implement exactly these static methods:

getProductName(): string
getProductDescription(): string
getProductPrice(): string
getDepartment(): string
getImageUrl(): string
getNumber(): number
For product price, generate a Faker commerce price between 1 and 500 with 2 decimal places.

For getNumber(), generate a random integer between 1 and 999.
2.4 API Payload Generators
Reference link: https://documenter.getpostman.com/view/4790112/2sBY4WnGCZ

Implement exactly these static methods:

generateInvalidLoginPayload()
generateProductPayload()
generateUpdatedProductPayload()
generateUserPayload()
generateUserUpdatePayload()
generateCartPayload(userId: number)
generateUpdatedCartPayload(userId: number)
Required return structures:

generateInvalidLoginPayload() must return:

username generated using getUsername()
password generated using getPassword()
generateProductPayload() must return:

title
price as a number
description
image
category in lowercase
generateUpdatedProductPayload() must return the same product payload structure, but the title must start with Updated .

generateUserPayload() must return this structure:

email
username
password
name
firstname
lastname
address
city
street
number
zipcode
geolocation
lat
long
phone
generateUserUpdatePayload() must return the same user structure, with the username prefixed with updated-.

generateCartPayload(userId: number) and generateUpdatedCartPayload(userId: number) must return:

userId
date in YYYY-MM-DD format
products
productId
quantity
Use the existing methods within RandomDataUtil wherever applicable instead of duplicating Faker logic.

Expected Result
A utils/dataGenerator.ts file exporting the RandomDataUtil class that generates random person, date, commerce, and API payload data for use in tests.
*/

import { faker } from '@faker-js/faker';

//const faker = new Faker();  
export class RandomDataUtil {
    // Person
    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName();
    }

    static getFullName(): string {
        return faker.person.fullName();
    }

    static getEmail(): string {
        return faker.internet.email();
    }

    static getPhoneNumber(): string {
        return faker.phone.number();
    }

    static getUsername(): string {
        return faker.internet.username();
    }

    static getPassword(length: number = 10): string {
        return faker.internet.password({ length });
    }

    static getCountry(): string {
        return faker.location.country();
    }

    static getState(): string {
        return faker.location.state();
    }

    static getCity(): string {
        return faker.location.city();
    }

    static getStreet(): string {
        return faker.location.street();
    }

    static getStreetAddress(): string {
        return faker.location.streetAddress();
    }

    static getZipCode(): string {
        return faker.location.zipCode();
    }

    static getLatitude(): string {
        return faker.location.latitude().toString();
    }

    static getLongitude(): string {
        return faker.location.longitude().toString();
    }

    // Date & Time
    static getCurrentDate(): string {
        return new Date().toISOString().split('T')[0];
    }

    static getRecentDate(days: number = 10): string {
        const date = faker.date.recent({ days });
        return date.toISOString().split('T')[0];
    }

    static getFutureDate(years: number = 1): string {
        const date = faker.date.future({ years });
        return date.toISOString().split('T')[0];
    }

    static getPastDate(years: number = 1): string {
        const date = faker.date.past({ years });
        return date.toISOString().split('T')[0];
    }

    // Commerce
    static getProductName(): string {
        return faker.commerce.productName();
    }

    static getProductDescription(): string {
        return faker.commerce.productDescription();
    }

    static getProductPrice(): string {
        return faker.commerce.price({ min: 1, max: 500, dec: 2 });
    }

    static getDepartment(): string {
        return faker.commerce.department();
    }

    static getImageUrl(): string {
        return faker.image.url();
    }

    static getNumber(): number {
        return faker.number.int({ min: 1, max: 999 });
    }
    // API Payload Generators
    static generateInvalidLoginPayload() {
        return {
            username: this.getUsername(),
            password: this.getPassword()
        };
    }

    static generateProductPayload() {
        return {
            title: this.getProductName(),
            price: parseFloat(this.getProductPrice()),
            description: this.getProductDescription(),
            image: this.getImageUrl(),
            category: this.getDepartment().toLowerCase()
        };
    }

    static generateUpdatedProductPayload() {
        const payload = this.generateProductPayload();
        payload.title = `Updated ${payload.title}`;
        return payload;
    }

    static generateUserPayload() {
        return {
            email: this.getEmail(),
            username: this.getUsername(),
            password: this.getPassword(),
            name: this.getFullName(),
            firstname: this.getFirstName(),
            lastname: this.getLastName(),
            address: this.getStreetAddress(),
            city: this.getCity(),
            street: this.getStreet(),
            number: this.getNumber(),
            zipcode: this.getZipCode(),
            geolocation: {
                lat: this.getLatitude(),
                long: this.getLongitude()
            },
            phone: this.getPhoneNumber()
        };
    }

    static generateUserUpdatePayload() {
        const payload = this.generateUserPayload();
        payload.username = `updated-${payload.username}`;
        return payload;
    }

    static generateCartPayload(userId: number) {
        return {
            userId,
            date: this.getCurrentDate(),
            products: [
                {
                    productId: this.getNumber(),
                    quantity: this.getNumber()
                }
            ]
        };
    }

    static generateUpdatedCartPayload(userId: number) {
        return this.generateCartPayload(userId);
    }
}