import { test, expect } from "@playwright/test";
import { ProductPages } from "../Pages/Productpages";
import { BASE_URL, USERNAME, PASSWORD } from "../utlis/envConfig";
import { Loginpage } from "../Pages/loginpage";
import { ProductPage } from "../Locators/ProductPagelocators";
import { ProductData } from "../Test-data/Products";


test.describe("Product Page Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginpage = new Loginpage(page);
    await page.goto(BASE_URL);
    await loginpage.login(USERNAME, PASSWORD);
  });

  test("Logout from the application", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test("validate about page and Navigate to back ", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.about();
  });

  test("Validate product details on the product page", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.validateAllProductDisplayed();
    await productPages.addFirstProductToCart();
    await productPages.addAllProductsToCart();

  });

  test("Add specific product to cart", async ({ page }) => {
    const productPages = new ProductPages(page);
    for (const productName of ProductData) {
      await productPages.addSpecificProductToCart(productName);
    }
  });

  test("filter By Name A to Z", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.filterByNameAtoZ();
    const productNames = await productPages.getProductNames();
    console.log("Product Names after sorting A to Z:", productNames);
    const sortedNamesAtoZ = [...productNames].sort();
    console.log("Expected Product Names sorted A to Z:", sortedNamesAtoZ);
    expect(productNames).toEqual(sortedNamesAtoZ);
  });

  test("filter By Name Z to A", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.filterByNameZtoA();
    const productNames = await productPages.getProductNames();
    console.log("Product Names after sorting Z to A:", productNames);
    const sortedNamesZtoA = [...productNames].sort().reverse();
    console.log("Expected Product Names sorted Z to A:", sortedNamesZtoA);
    expect(productNames).toEqual(sortedNamesZtoA);
  });

  test.only("filter By Price Low to High", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.filterByPriceLowToHigh();
    const productPrices = await productPages.getProductPrices();
    console.log("Product Prices after sorting Low to High:", productPrices);
    const sortedPricesLowToHigh = [...productPrices].sort((a, b) => a - b);
    console.log("Expected Product Prices sorted Low to High:", sortedPricesLowToHigh);
    expect(productPrices).toEqual(sortedPricesLowToHigh);
  });

  test("filter By Price High to Low", async ({ page }) => {
    const productPages = new ProductPages(page);
    await productPages.filterByPriceHighToLow();
    const productPrices = await productPages.getProductPrices();
    console.log("Product Prices after sorting High to Low:", productPrices);
    const sortedPricesHighToLow = [...productPrices].sort((a, b) => b - a);
    console.log("Expected Product Prices sorted High to Low:", sortedPricesHighToLow);
    expect(productPrices).toEqual(sortedPricesHighToLow);
  });



});