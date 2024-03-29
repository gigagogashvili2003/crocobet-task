import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from '@app/redis'
import { envSchema } from '@app/common/lib/schema'
import { DbModule } from '@app/db'
import { CommonModule } from '@app/common'
import { UtilsModule } from '@app/utils'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema }),
        RedisModule,
        DbModule,
        CommonModule,
        UtilsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
