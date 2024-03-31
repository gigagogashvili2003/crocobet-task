import { IBaseRepository } from '@app/common/lib/interfaces'
import { User } from '../entities'

export interface IUserRepository extends IBaseRepository<User> {}
