import { ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'

export const getRedisConfig = async (configService: ConfigService) => {
    const host = configService.get<string>('REDIS_HOST')
    const port = configService.get<number>('REDIS_PORT')

    const redisInstance = new Redis({
        host,
        port,
    })

    redisInstance.on('connecting', () => console.info(`Trying to connect redis on ${host} ${port}`))

    redisInstance.on('connect', () => console.info(`Succesfully connected redis on ${host} ${port}`))

    redisInstance.on('error', (e) => {
        throw new Error(`Redis connection failed: ${e}`)
    })

    return redisInstance
}
