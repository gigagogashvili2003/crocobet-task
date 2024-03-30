import { UsersService } from '@app/users'
import { USER_SERVICE } from '@app/users/lib/constants'
import { Controller, Inject } from '@nestjs/common'

@Controller('users')
export class UsersController {
    public constructor(@Inject(USER_SERVICE) private readonly usersService: UsersService) {}
}
