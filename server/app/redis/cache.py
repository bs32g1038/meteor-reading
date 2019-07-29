import json

import aioredis
from fastapi.encoders import jsonable_encoder


class Cache:

    redisClient = None

    @classmethod
    async def init_redis(cls):
        redisClient = await aioredis.create_redis_pool(
            "redis://localhost", minsize=5, maxsize=10
        )
        cls.redisClient = redisClient

    async def hset(self, key, field, value, expire=60):
        v = await self.redisClient.hset(key, field, json.dumps(jsonable_encoder(value)))
        rs = await self.redisClient.ttl(key)
        if rs == -1:
            return await self.redisClient.expire(key, expire)
        else:
            return v

    async def hget(self, key, field):
        rs = await self.redisClient.hget(key, field)
        if not rs:
            return None
        return json.loads(rs)
