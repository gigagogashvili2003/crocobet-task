import { Inject, Injectable } from '@nestjs/common'
import { REDIS_REPOSITORY } from '../constants'
import { IRedisRepository } from '../interfaces'
import { RedisKey, RedisValue } from '../types'
import { RedisTTL } from '../enums'

@Injectable()
export class RedisService {
    public constructor(
        @Inject(REDIS_REPOSITORY)
        private readonly redisRepository: IRedisRepository,
    ) {}

    public set(key: RedisKey, value: RedisValue, ttl?: RedisTTL): Promise<'OK'> {
        return this.redisRepository.set(key, value, ttl)
    }

    public get(key: RedisKey): Promise<string> {
        return this.redisRepository.get(key)
    }

    public update(key: RedisKey, value: RedisValue): Promise<'OK'> {
        return this.redisRepository.update(key, value)
    }

    public delete(key: RedisKey): Promise<number> {
        return this.redisRepository.delete(key)
    }
}
