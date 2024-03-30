import { Provider } from '@nestjs/common';
import { SessionRepository } from '../repositories';
import { SESSION_REPOSITORY, SESSION_SERVICE } from '../constants';
import { SessionService } from '../services';

export const sessionProviders: Array<Provider> = [
    { provide: SESSION_REPOSITORY, useClass: SessionRepository },
    { provide: SESSION_SERVICE, useClass: SessionService },
];
