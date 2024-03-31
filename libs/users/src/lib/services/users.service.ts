import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../constants';
import { IUser, IUserRepository } from '../interfaces';
import { ProfileResponseEntity } from '../response-entities';
import { GenericResponse } from '@app/common';

@Injectable()
export class UsersService {
    public constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    public me(currentUser: IUser): GenericResponse<{ user: IUser }> {
        const serializedUser = this.serialize(currentUser);

        return { status: HttpStatus.OK, body: { user: serializedUser } };
    }

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
