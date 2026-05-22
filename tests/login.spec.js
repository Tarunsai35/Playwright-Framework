import {test, expect} from '@playwright/test';
import { Loginpage } from '../Pages/loginpage';
import { BASE_URL, USERNAME, PASSWORD } from '../utlis/envConfig';


test('Login to Sauce Demo Application with valid credentials', async ({page}) => {

    const loginpage = new Loginpage(page);

    await page.goto(BASE_URL);
    await loginpage.login(USERNAME, PASSWORD);

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});


