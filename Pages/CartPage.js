import { CartpageLocators } from '../Locators/Cartpagelocators';

export class CartPage {
    constructor(page) {
        this.page = page;
    }

    async clickOnCheckoutButton() {
        await this.page.locator(CartpageLocators.checkoutButton).click();
    }

    async clickOnContinueShoppingButton() {
        await this.page.locator(CartpageLocators.continueShoppingButton).click();
    }

    async getCartPageElements() {
        const cartTitle = await this.page.locator(CartpageLocators.carttile);
        const checkoutButton = await this.page.locator(CartpageLocators.checkoutButton);
        const continueShoppingButton = await this.page.locator(CartpageLocators.continueShoppingButton);
        return { cartTitle, checkoutButton, continueShoppingButton };
    }

    async getCartProductDetails() {
        const productNames = await this.page.locator(CartpageLocators.ProductName).allTextContents();
        const productDescriptions = await this.page.locator(CartpageLocators.ProductDescription).allTextContents();
        const productPrices = await this.page.locator(CartpageLocators.ProductPrice).allTextContents();
        return { productNames, productDescriptions, productPrices };
    }

    async removeFirstProduct() {
        await this.page.locator(CartpageLocators.removeButton).click();
    }
    
    async clickOnCheckoutButton() {
        await this.page.locator(CartpageLocators.checkoutButton).click();
    }
    

}

