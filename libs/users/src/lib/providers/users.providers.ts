import { Provider } from '@nestjs/common'
import { USERS_SERVICE } from '../constants'
import { UsersService } from '../services'

export const usersProviders: Array<Provider> = [{ provide: USERS_SERVICE, useClass: UsersService }]
