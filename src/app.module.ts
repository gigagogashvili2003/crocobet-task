import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from '@app/redis'
import { envSchema } from '@app/common/lib/schema'
import { DbModule } from '@app/db'
import { CommonModule, ThrottlerTTL } from '@app/common'
import { UtilsModule } from '@app/utils'
import { SessionsModule } from '@app/sessions'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema }),
        ThrottlerModule.forRoot([{ ttl: ThrottlerTTL.LONG, limit: ThrottlerTTL.MEDIUM }]),
        RedisModule,
        DbModule,
        CommonModule,
        UtilsModule,
        SessionsModule,
    ],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
