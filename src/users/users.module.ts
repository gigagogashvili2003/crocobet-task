import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersLibModule } from '@app/users'

@Module({
    imports: [UsersLibModule],
    controllers: [UsersController],
})
export class UsersModule {}
