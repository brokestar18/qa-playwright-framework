import {test, expect} from "@playwright/test"

test('проверка API', async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/ping');
    expect(response.status()).toBe(201);
})