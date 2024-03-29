import { RedisTTL } from '../enums'
import { RedisKey, RedisValue } from '../types'

export interface IRedisRepository {
    get(key: RedisKey): Promise<string>
    update(key: RedisKey, value: RedisValue): Promise<'OK'>
    set(key: RedisKey, value: RedisValue, ttl?: RedisTTL): Promise<'OK'>
    delete(key: RedisKey): Promise<number>
}
