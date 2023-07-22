const {
  DB_DEV_USER,
  DB_DEV_HOST,
  DB_DEV_PORT,
  DB_DEV_PWD,
  DB_DEV_DIALECT,
  DB_DEV_NAME,

  DB_STG_USER,
  DB_STG_PWD,
  DB_STG_NAME,
  DB_STG_HOST,
  DB_STG_PORT,
  DB_STG_DIALECT,

  DB_HOST,
  DB_USER,
  DB_DIALECT,
  DB_NAME,
  DB_PWD,
  DB_PORT,
} = require("./");
const logger = require("../helpers/logger");

var reconnectOptions = {
  max_retries: 1000,
  onRetry: function (count) {
    logger(module).info("connection lost, trying to reconnect (" + count + ")");
  },
};

module.exports = {
  development: {
    username: DB_DEV_USER,
    password: DB_DEV_PWD,
    database: DB_DEV_NAME,
    host: DB_DEV_HOST,
    port: DB_DEV_PORT,
    dialect: DB_DEV_DIALECT,
    logging: false,
    reconnect: reconnectOptions || true,
    pool: {
      max: 300,
      min: 0,
      acquire: 100000,
      idle: 1000,
      evict: 500,
    //   maxUses: 10,
    },
  },
  staging: {
    username: DB_STG_USER,
    password: DB_STG_PWD,
    database: DB_STG_NAME,
    host: DB_STG_HOST,
    port: DB_STG_PORT,
    dialect: DB_STG_DIALECT,
    reconnect: reconnectOptions || true,
    logging: false,
    pool: {
      max: 300,
      min: 0,
      acquire: 100000,
      idle: 1000,
      evict: 500,
    //   maxUses: 10,
    },
  },
  test: {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  production: {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    reconnect: reconnectOptions || true,
    logging: false,
    pool: {
        max: 300,
        min: 0,
        acquire: 100000,
        idle: 1000,
        evict: 500,
      //   maxUses: 10,
      },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
