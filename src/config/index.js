/**
 * All environment variables for config must be intialized here for easy access
 */

 const dotenv = require("dotenv")

 if (process.env.NODE_ENV === "production") {
	 dotenv.config({ path: ".env.prod" })
 }
 if (process.env.NODE_ENV === "staging") {
	 dotenv.config({ path: ".env.staging" })
 } else {
	 dotenv.config({ path: ".env.local" })
 }
 
 module.exports = {
	 NODE_ENV: process.env.NODE_ENV || "development",
	 PORT: process.env.PORT || "7211",
 
	 //dev
	 DB_DEV_USER: process.env.DB_DEV_USER || "postgres",
	 DB_DEV_PWD: process.env.DB_DEV_PWD || "",
	 DB_DEV_NAME: process.env.DB_DEV_NAME || "betty_bingo_dev",
	 DB_DEV_HOST: process.env.DB_DEV_HOST || "localhost",
	 DB_DEV_PORT: process.env.DB_DEV_PORT || 5432,
	 DB_DEV_DIALECT: process.env.DB_DEV_DIALECT || "postgres",
 
	 //staging
	 DB_STG_USER: process.env.DB_STG_USER || "postgres",
	 DB_STG_PWD: process.env.DB_STG_PWD || "",
	 DB_STG_NAME: process.env.DB_STG_NAME || "betty_bingo_staging",
	 DB_STG_HOST: process.env.DB_STG_HOST || "localhost",
	 DB_STG_PORT: process.env.DB_STG_PORT || 5432,
	 DB_STG_DIALECT: process.env.DB_STG_DIALECT || "postgres",
 
	 //prod
	 DB_USER: process.env.DB_USER,
	 DB_PWD: process.env.DB_PWD,
	 DB_NAME: process.env.DB_NAME,
	 DB_HOST: process.env.DB_HOST,
	 DB_PORT: process.env.DB_PORT || 5432,
	 DB_DIALECT: process.env.DB_DIALECT || "postgres",
 
	 SALT_ROUNDS_FOR_HASH: process.env.SALT_ROUNDS_FOR_HASH || 10,
	 USER_JWT_SECRET_KEY: process.env.USER_JWT_SECRET_KEY || "thisisveryaverysupersecretkeydonotallowaccesstoanyone",
	 ADMIN_JWT_SECRET_KEY: process.env.ADMIN_JWT_SECRET_KEY || "secretforadminauthentication",
	 ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d",
	 REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || 432000000, //default to 5days TODO: add refresh token
	 ADMIN_KEY: process.env.ADMIN_KEY,
	 PAYSTACK_SECRET: process.env.PAYSTACK_SECRET,
		
 }
 