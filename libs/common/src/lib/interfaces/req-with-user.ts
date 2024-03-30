import { IUser } from '@app/users/lib/interfaces';

export interface RequestWithUser<T extends IUser> extends Request {
    user: T;
}
