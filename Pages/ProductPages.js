import { page } from '@playwright/test';
import { ProductPage } from '../Locators/ProductPagelocators';
import { expect } from '@playwright/test';

export class ProductPages {
    constructor(page) {
        this.page = page;
        this.expect = expect;
    }

    async logout() {
        await this.page.locator(ProductPage.BurgerMenuButton).click();
        await this.page.locator(ProductPage.LogoutButton).click();
    }

    async about() {
        await this.page.locator(ProductPage.BurgerMenuButton).click();
        await this.page.locator(ProductPage.AboutButton).click();
        await this.page.goBack();
        await expect(this.page.locator(ProductPage.BurgerMenuButton)).toBeVisible();
    }


    async validateAllProductDisplayed() {
        const productName = await this.page.locator(ProductPage.ProductName).allTextContents();
        console.log("Product Names:", productName);
        const productDescription = await this.page.locator(ProductPage.ProductDescription).allTextContents();
        const productPrice = await this.page.locator(ProductPage.ProductPrice).allTextContents();
        const addToCartCount = await this.page.locator(ProductPage.AddToCartButton).count();

        if (productName.length === 0) {
            throw new Error("Product names are not visible on the page.");
        }

        if (productName.length !== productDescription.length || productName.length !== productPrice.length || productName.length !== addToCartCount) {
            throw new Error("Mismatch in the number of product details. Please check the locators and the page structure.");
        }
    }

    async addFirstProductToCart() {
        await this.page.locator(ProductPage.AddToCartButton).first().click();
    }

    async addAllProductsToCart() {
        const addToCartButtons = await this.page.locator(ProductPage.AddToCartButton).count();
        console.log("Total 'Add to Cart' buttons found:", addToCartButtons);
        for (let i = 0; i < addToCartButtons; i++) {
            await this.page.locator(ProductPage.AddToCartButton).nth(i).click();
            await this.page.waitForTimeout(3000);
        }
    }

    async addSpecificProductToCart(productName) {
        const productCount = await this.page.locator(ProductPage.ProductName).count();
        for (let i = 0; i < productCount; i++) {
            const name = await this.page.locator(ProductPage.ProductName).nth(i).textContent();
            if (name.trim() === productName) {
                await this.page.locator(ProductPage.AddToCartButton).nth(i).click();
                await this.page.waitForTimeout(3000);
                break;
            }
        }
    }

    async filterByNameAtoZ() {
        await this.page.locator(ProductPage.FilterDropdown).selectOption(ProductPage.FilterNameAtoZ);
    }

    async filterByNameZtoA() {
        await this.page.locator(ProductPage.FilterDropdown).selectOption(ProductPage.FilterNameZtoA);
    }

    async filterByPriceLowToHigh() {
        await this.page.locator(ProductPage.FilterDropdown).selectOption(ProductPage.FilterPriceLowToHigh);
    }

    async filterByPriceHighToLow() {
        await this.page.locator(ProductPage.FilterDropdown).selectOption(ProductPage.FilterPriceHighToLow);
    }

    async getProductNames() {
        return await this.page.locator(ProductPage.ProductName).allTextContents();
    }

    async getProductPrices() {
        const prices = await this.page.locator(ProductPage.ProductPrice).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async clickOnCartIcon() {
        await this.page.locator(ProductPage.Cartlink).click();
    }

    async getFirstProductDetails() {
        const name = await this.page.locator(ProductPage.ProductName).first().textContent();
        const description = await this.page.locator(ProductPage.ProductDescription).first().textContent();
        const price = await this.page.locator(ProductPage.ProductPrice).first().textContent();
        return { name: name.trim(), description: description.trim(), price: price.trim() };
    }

    async getAllProductDetails() {
        const productCount = await this.page.locator(ProductPage.ProductName).count();
        const products = [];

        for (let i = 0; i < productCount; i++) {
            const name = await this.page.locator(ProductPage.ProductName).nth(i).textContent();
            const description = await this.page.locator(ProductPage.ProductDescription).nth(i).textContent();
            const price = await this.page.locator(ProductPage.ProductPrice).nth(i).textContent();
            products.push({ name: name.trim(), description: description.trim(), price: price.trim() });
        }
        return products;

    }

    async getSpecificProductDetails(productName) {
        const productCount = await this.page.locator(ProductPage.ProductName).count();
        for (let i = 0; i < productCount; i++) {
            const name = await this.page.locator(ProductPage.ProductName).nth(i).textContent();
            if (name.trim() === productName) {
                const description = await this.page.locator(ProductPage.ProductDescription).nth(i).textContent();
                const price = await this.page.locator(ProductPage.ProductPrice).nth(i).textContent();
                return { name: name.trim(), description: description.trim(), price: price.trim() };
            }
        }
        throw new Error(`Product not found: ${productName}`);
    
    }

    async getFirstProductDetails() {
        const name = await this.page.locator(ProductPage.ProductName).first().textContent();
        const description = await this.page.locator(ProductPage.ProductDescription).first().textContent();
        const price = await this.page.locator(ProductPage.ProductPrice).first().textContent();
        return { name: name.trim(), description: description.trim(), price: price.trim() };
    }
    



}

