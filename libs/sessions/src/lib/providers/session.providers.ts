import { Provider } from '@nestjs/common'
import { SESSIONS_REPOSITORY, SESSIONS_SERVICE } from '../constants'
import { SessionRepository } from '../repositories'
import { SessionsService } from '../services'

export const sessionProviders: Array<Provider> = [
    { provide: SESSIONS_REPOSITORY, useClass: SessionRepository },
    { provide: SESSIONS_SERVICE, useClass: SessionsService },
]
