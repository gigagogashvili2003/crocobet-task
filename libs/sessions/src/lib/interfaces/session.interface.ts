import { IDate } from '@app/common';
import { IUser } from '@app/users/lib/interfaces';

export interface ISession extends IDate {
    id: number;
    refreshToken: string;
    user: IUser;
}
