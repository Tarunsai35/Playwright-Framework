import { Loginlocators } from "../Locators/loginlocators";
import { page } from '@playwright/test';

export class Loginpage {

    constructor(page) {
        this.page = page;
    }

    async login(username , password) {
        await this.page.fill(Loginlocators.email, username);
        await this.page.fill(Loginlocators.password, password);
        await this.page.click(Loginlocators.loginButton);
    }
}
    