import { Module } from '@nestjs/common'
import { usersProviders } from './lib/providers'

@Module({
    providers: [...usersProviders],
    exports: [...usersProviders],
})
export class UsersModule {}
