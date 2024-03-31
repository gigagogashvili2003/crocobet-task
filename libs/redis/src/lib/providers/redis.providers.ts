import { Provider } from '@nestjs/common';
import { REDIS_CLIENT, REDIS_HELPER_SERVICE, REDIS_REPOSITORY, REDIS_SERVICE } from '../constants';
import { RedisRepository } from '../repositories';
import { ConfigService } from '@nestjs/config';
import { getRedisConfig } from '../config';
import { RedisHelperService, RedisService } from '../services';

export const redisProviders: Array<Provider> = [
    { provide: REDIS_CLIENT, useFactory: getRedisConfig, inject: [ConfigService] },
    { provide: REDIS_REPOSITORY, useClass: RedisRepository },
    { provide: REDIS_SERVICE, useClass: RedisService },
    { provide: REDIS_HELPER_SERVICE, useClass: RedisHelperService },
];
