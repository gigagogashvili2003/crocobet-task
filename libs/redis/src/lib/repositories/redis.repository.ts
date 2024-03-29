import { Inject, Injectable } from '@nestjs/common'
import { RedisKey, RedisValue } from '../types'
import { IRedisRepository } from '../interfaces'
import { REDIS_CLIENT } from '../constants'
import { Redis } from 'ioredis'
import { RedisTTL } from '../enums'

@Injectable()
export class RedisRepository implements IRedisRepository {
    constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

    public get(key: RedisKey): Promise<string> {
        return this.redis.get(key)
    }
    public update(key: RedisKey, value: RedisValue): Promise<'OK'> {
        return this.redis.set(key, value, 'XX')
    }

    public set(key: RedisKey, value: RedisValue, ttl?: RedisTTL): Promise<'OK'> {
        return this.redis.set(key, value, 'EX', ttl || 3600)
    }
    public delete(key: RedisKey): Promise<number> {
        return this.redis.del(key)
    }
}
