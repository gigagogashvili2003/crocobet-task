import { ICollectionBook } from '@app/collection-books/lib/interfaces';
import { IDate } from '@app/common';
import { IUser } from '@app/users/lib/interfaces';

export interface ICollection extends IDate {
    id: number;
    name: string;
    user: IUser;
    collectionBooks: ICollectionBook[];
}
