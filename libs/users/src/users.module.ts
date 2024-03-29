import { Module } from '@nestjs/common'
import { usersProviders } from './lib/providers'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './lib/entities'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [...usersProviders],
    exports: [...usersProviders],
})
export class UsersModule {}
