import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { REDIS_SERVICE } from '@app/redis/lib/constants'
import { RedisService } from '@app/redis'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject(REDIS_SERVICE) private readonly redisService: RedisService,
    ) {}

    @Get()
    getHello() {
        this.redisService.set('hello', 'world')
        return this.redisService.get('hello')
        // return this.appService.getHello()
    }
}
