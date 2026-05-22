import { FinalPageLocators } from "../Locators/FinalPageLocators";
import { page } from "@playwright/test";

export class FinalPage {
    constructor(page) {
        this.page = page;
    }

    async getFinalPageElement() {
        const finalPageTitle = await this.page.locator(FinalPageLocators.finalPageTitle);
        const finalPageText = await this.page.locator(FinalPageLocators.finalPageText);
        const finalPageImage = await this.page.locator(FinalPageLocators.finalPageImage);
        const backHomeButton = await this.page.locator(FinalPageLocators.backHomeButton);
        return { finalPageTitle, finalPageText, finalPageImage, backHomeButton };
    }

    async getFinalPageText() {
        return await this.page.locator(FinalPageLocators.finalPageText).textContent();
    }

    async isFinalPageImageVisible() {
        return await this.page.locator(FinalPageLocators.finalPageImage).isVisible();
    }

    async clickBackHomeButton() {
        await this.page.click(FinalPageLocators.backHomeButton);
    }






}