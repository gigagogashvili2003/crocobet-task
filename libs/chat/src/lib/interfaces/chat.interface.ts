import { IDate } from '@app/common';
import { IUser } from '@app/users/lib/interfaces';

export interface IChat extends IDate {
    id: number;
    user1: IUser;
    user2: IUser;
}
