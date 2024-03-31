import { Inject, Injectable } from '@nestjs/common';
import { SESSION_REPOSITORY } from '../constants';
import { ISession, ISessionRepository } from '../interfaces';

@Injectable()
export class SessionService {
    public constructor(@Inject(SESSION_REPOSITORY) private readonly sessionRepository: ISessionRepository) {}

    public findOneByUser(id: number) {
        return this.sessionRepository.findOneByCondition({ where: { user: { id } } });
    }

    public createAndSave(session: Partial<ISession>) {
        const newSession = this.sessionRepository.create(session);
        return this.sessionRepository.save(newSession);
    }

    public deleteByUser(id: number) {
        return this.sessionRepository.delete({ user: { id } });
    }

    public updateByUser(id: number, session: Partial<ISession>) {
        return this.sessionRepository.update({ user: { id } }, session);
    }
}
