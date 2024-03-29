import { Module } from '@nestjs/common'
import { redisProviders } from './lib/providers'

@Module({
    providers: [...redisProviders],
    exports: [...redisProviders],
})
export class RedisModule {}
