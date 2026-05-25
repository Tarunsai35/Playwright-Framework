import { test, request, expect } from "@playwright/test";

let requestContext1;

test.beforeAll(async () => {
    requestContext1 = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            "Accept": "application/json"
        }
    });
});

test("Api Testing with GET method 1", async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking", {
        headers: {
            "Accept": "application/json"
        }
    });
    console.log(await response.json());
});

test("Api Testing with GET method 2", async () => {
    const requestContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            "Accept": "application/json"
        }
    });
    const response = await requestContext.get("/booking");
    console.log(await response.json());
});

test("Api Testing with GET method 3", async () => {
    const response1 = await requestContext1.get("/booking")
    console.log(await response1.json());
});

test("Api Testing with GET method 4", async ({ request }) => {
    const response = await request.get("/booking");
    console.log(await response.json());
});

test("Api Testing with GET method 5", async ({ request }) => {
    const response = await request.get("/booking/100");
    console.log(await response.json());
});

test("Api Testing with GET method 6", async ({ request }) => {
    const response = await request.get("/booking?firstname=Josh&lastname=Allen");
    console.log(await response.json());
});

test("Api Testing with GET method 7", async ({ request }) => {
    const response = await request.get("/booking", {
        params: {
            firstname: "Josh",
            lastname: "Allen"
        }
    });
    console.log(await response.json());
});

test("Api Testing with GET method 8", async ({ request }) => {
    const response = await request.get("/booking/23");
    console.log(await response.json());
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(await response.json()).toMatchObject({
        "firstname": "Jane",
        "lastname": "Doe",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Extra pillows please"
    });

    const response1 = await response.json();
    expect(response1.firstname).toBe("Jane");

});


test.only("Api Testing with Ui Verification", async ({ request }) => {

    const response = await request.get("https://api.demoblaze.com/entries");

    expect(response.status()).toBe(200);

    const responseJson = await response.json();

    console.log(responseJson.Items[2].title);

});