// export const BASE_URL = "https://www.saucedemo.com/";
// export const USERNAME = "standard_user";
// export const PASSWORD = "secret_sauce";

const ENV_URL = {
    prod : "https://www.saucedemo.com/",
    dev : "https://www.saucedemo.com/",
    qa : "https://www.saucedemo.com/",
}

const ENV = process.env.ENV || "prod";
export const BASE_URL = ENV_URL[ENV];

export const USERNAME = "standard_user";
export const PASSWORD = "secret_sauce";