import { IDate } from '@app/common';

export interface IUser extends IDate {
    id: number;
    name: string;
    email: string;
    password: string;
}
