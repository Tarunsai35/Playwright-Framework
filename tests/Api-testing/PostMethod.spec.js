import { test, expect } from '@playwright/test';

test("Api Testing with POST method", async ({ request }) => {
    const response = await request.post("/booking", {
        data: {
            "firstname": "Josh",
            "lastname": "Allen",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Extra pillows please"
        },
    });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(responseBody.booking).toMatchObject({
        "firstname": "Josh",
        "lastname": "Allen",
        "totalprice": 111,
        "depositpaid": true,
    });

    expect(responseBody.booking.additionalneeds).toEqual("Extra pillows please")

});

test("Api Testing with POST method 2", async ({ request }) => {
    const response = await request.post("https://api.demoblaze.com/addtocart", {
        data: {"id":"b10aa616-7777-f6fd-a5b9-109172f24a90","cookie":"YWExNzgwMzc5","prod_id":3,"flag":true}
    })
    expect(response.status()).toBe(200);
});