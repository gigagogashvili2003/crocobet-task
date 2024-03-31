import { Injectable } from '@nestjs/common'
import { Session } from '../entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ISessionRepository } from '../interfaces'
import { BaseAbstractRepository } from '@app/common'

@Injectable()
export class SessionRepository extends BaseAbstractRepository<Session> implements ISessionRepository {
    public constructor(@InjectRepository(Session) private readonly SessionRepository: Repository<Session>) {
        super(SessionRepository)
    }
}
