import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../constants';
import { IUser, IUserRepository } from '../interfaces';
import { ProfileResponseEntity } from '../response-entities';

@Injectable()
export class UsersService {
    public constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    public serialize(user: IUser) {
        return new ProfileResponseEntity(user);
    }

    public findOneByEmail(email: string) {
        return this.userRepository.findOneByCondition({ where: { email } });
    }

    public findOneById(id: number) {
        return this.userRepository.findOneById(id);
    }

    public createAndSave(user: Partial<IUser>) {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    public updateById(id: number, data: Partial<IUser>) {
        return this.userRepository.update({ id }, data);
    }
}