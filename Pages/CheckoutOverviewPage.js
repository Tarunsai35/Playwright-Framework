import  {page } from '@playwright/test';
import { CartPage } from './CartPage';
import { CheckoutOverviewLocators } from '../Locators/CheckoutOverviewLocators';

export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
    }

    async getCheckoutOverviewElements() {
        const checkoutOverviewTitle = await this.page.locator(CheckoutOverviewLocators.carttile);
        const cancelButton = await this.page.locator(CheckoutOverviewLocators.cancel);
        const finishButton = await this.page.locator(CheckoutOverviewLocators.finishButton);
        return { checkoutOverviewTitle, cancelButton, finishButton };
    }

    async getCheckoutOverviewProductDetails() {
        const productNames = await this.page.locator(CheckoutOverviewLocators.ProductName).allTextContents();
        const productDescriptions = await this.page.locator(CheckoutOverviewLocators.ProductDescription).allTextContents();
        const productPrices = await this.page.locator(CheckoutOverviewLocators.ProductPrice).allTextContents();
        return { productNames, productDescriptions, productPrices };
    }

    async getIteamTotal() {
        return await this.page.locator(CheckoutOverviewLocators.iteamTotal).textContent();
    }

    async getTax() {
        return await this.page.locator(CheckoutOverviewLocators.tax).textContent();
    }

    async getTotal() {
        return await this.page.locator(CheckoutOverviewLocators.total).textContent();
    }

    async clickOnCancelButton() {
        await this.page.locator(CheckoutOverviewLocators.cancel).click();
    }

    async clickOnFinishButton() {
        await this.page.locator(CheckoutOverviewLocators.finishButton).click();
    }



}