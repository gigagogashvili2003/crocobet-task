import { Module } from '@nestjs/common'
import { sessionProviders } from './lib/providers'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from './lib/entities'

@Module({
    imports: [TypeOrmModule.forFeature([Session])],
    providers: [...sessionProviders],
    exports: [...sessionProviders],
})
export class SessionsModule {}
