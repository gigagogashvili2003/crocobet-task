import { Provider } from '@nestjs/common'
import { UsersService } from '../services'
import { USER_REPOSITORY, USER_SERVICE } from '../constants'
import { UserRepository } from '../repositories'

export const usersProviders: Array<Provider> = [
    { provide: USER_SERVICE, useClass: UsersService },
    { provide: USER_REPOSITORY, useClass: UserRepository },
]
