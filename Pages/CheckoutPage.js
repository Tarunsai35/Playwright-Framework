import { page } from "@playwright/test";
import { CheckoutpageLocators } from "../Locators/Checkoutpagelocators";
import { CartPage } from "./CartPage";
import { CartpageLocators } from "../Locators/Cartpagelocators";
import { CheckoutData } from "../Test-data/Checkout";


export class CheckoutPage {
    constructor(page) {
        this.page = page;
    }


    async getCheckoutPageElements() {
        const checkoutTitle = await this.page.locator(CheckoutpageLocators.checkoutTitle);
        const firstNameInput = await this.page.locator(CheckoutpageLocators.firstNameInput);
        const lastNameInput = await this.page.locator(CheckoutpageLocators.lastNameInput);
        const postalCodeInput = await this.page.locator(CheckoutpageLocators.postalCodeInput);
        const continueButton = await this.page.locator(CheckoutpageLocators.continueButton);
        const cancelButton = await this.page.locator(CheckoutpageLocators.cancelButton);
        return { checkoutTitle, firstNameInput, lastNameInput, postalCodeInput, continueButton, cancelButton };
    }


    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.page.locator(CheckoutpageLocators.firstNameInput).fill(firstName);
        await this.page.locator(CheckoutpageLocators.lastNameInput).fill(lastName);
        await this.page.locator(CheckoutpageLocators.postalCodeInput).fill(postalCode);
    }

    async clickOnCancelButton() {
        await this.page.locator(CheckoutpageLocators.cancelButton).click();
    }

    async clickOnContinueButton() {
        await this.page.locator(CheckoutpageLocators.continueButton).click();   
    }

    async getErrorMessage() {
        return await this.page.locator(CheckoutpageLocators.errorMessage).textContent();
    }



}