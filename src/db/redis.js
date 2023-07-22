// let RedisClustr = require('redis-clustr');
// let RedisClient = require('redis');
const {
  REDIS_PORT,
  REDIS_KEY_1,
  REDIS_URL_1_1_HOST,
  REDIS_URL_1_2_HOST,
  REDIS_URL_1_3_HOST,
  REDIS_KEY_2,
  REDIS_URL_2_1_HOST,
  REDIS_URL_2_2_HOST,
  REDIS_URL_2_3_HOST,
  REDIS_KEY_3,
  REDIS_URL_3_1_HOST,
  REDIS_URL_3_2_HOST,
  REDIS_URL_3_3_HOST,
  NODE_ENV,
} = require("../config");

const Redis = require("ioredis");
let client;


exports.initializeRedis = () => {
  try {
    client = new Redis.Cluster([
      {
        host: REDIS_URL_1_1_HOST,
        port: REDIS_PORT,
      },
      {
        host: REDIS_URL_1_2_HOST,
        port: REDIS_PORT,
      },
      {
        host: REDIS_URL_1_3_HOST,
        port: REDIS_PORT,
      },
      {
        host: REDIS_URL_2_1_HOST,
        port: REDIS_PORT,
      },
      {
        host: REDIS_URL_2_2_HOST,
        port: REDIS_PORT,
      },
      {
        host: REDIS_URL_2_3_HOST,
        port: REDIS_PORT,
      },
      {
        host: REDIS_URL_3_1_HOST,
        port: REDIS_PORT,
      },
      {
        host: REDIS_URL_3_2_HOST,
        port: REDIS_PORT,
      },
      {
        host: REDIS_URL_3_3_HOST,
        port: REDIS_PORT,
      },
    ]);
    console.log("Connected to redis cluster");
  } catch (error) {
    console.log(error);
  }
};

exports.setCache = (key, value) => {
  client.set(key, value);
};

exports.setHashCache = (hashKey, key, value) => {
  client.hset(hashKey, key, value);
};
exports.getHashCache = (hashKey, key) => {
  return client.hget(hashKey, key);
};

exports.getCache = (key) => {
  return client.get(key);
};
exports.deleteKey = (key) => {
  return client.del(key);
};

exports.getHashKeys = (hashKey) => {
  return client.hkeys(hashKey);
};

exports.setCacheEx = (key, value, expiry) => {
  client.setex(key, expiry, value);
};

exports.setCacheExpiry = (key, value, expiry) => {
  //client.setex(key, expiry, value);
  client.set(key, value, "EX", expiry);
};

