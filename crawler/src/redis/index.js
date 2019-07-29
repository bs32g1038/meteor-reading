const { promisify } = require('util');
const logger = require('../logger');

const redis = require("redis"),
    client = redis.createClient({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: 6379,
        db: 8
    });
client.on("error", function (err) {
    logger.system.error("Error " + err);
});

const llenAsync = promisify(client.llen).bind(client);
const hexistsAsync = promisify(client.hexists).bind(client);
const lrangeAsync = promisify(client.lrange).bind(client);
const hgetAsync = promisify(client.hget).bind(client);
const sismemberAsync = promisify(client.sismember).bind(client);
const smembersAsync = promisify(client.smembers).bind(client);
const saddAsync = promisify(client.sadd).bind(client);
const hincrbyAsync = promisify(client.hincrby).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const hkeysAsync = promisify(client.hkeys).bind(client);
const sscanAsync = promisify(client.sscan).bind(client);

Object.assign(client, {
    llenAsync,
    hexistsAsync,
    lrangeAsync,
    hgetAsync,
    smembersAsync,
    sismemberAsync,
    saddAsync,
    hincrbyAsync,
    hgetallAsync,
    hkeysAsync,
    sscanAsync
});

module.exports = client;