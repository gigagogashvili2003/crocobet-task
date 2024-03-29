import { Injectable } from '@nestjs/common'
import { User } from '../entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IUserRepository } from '../interfaces'
import { BaseAbstractRepository } from '@app/common'

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> implements IUserRepository {
    public constructor(@InjectRepository(User) private readonly UserRepository: Repository<User>) {
        super(UserRepository)
    }
}
