const Faker = require('faker');

global.data = {
    customerEmail: 'galx14@gmail.com',
    customerPassword: 'QQww!!22',

    //data generator
    generate: {
        email: () => {
            const userEmail = (Faker.internet.exampleEmail()).toLowerCase();
            console.log("Generated email: " + userEmail);
            return userEmail
        },
        string: (length = 6) => {
            const randomString = Faker.internet.password(length, false, null, "");
            return randomString.toLowerCase()
        },
    }
}