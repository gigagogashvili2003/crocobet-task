import { IBookPageRead } from '@app/book-page-reads/lib/interfaces';
import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { ICollectionBook } from '@app/collection-books/lib/interfaces';
import { IDate } from '@app/common';
import { IUser } from '@app/users/lib/interfaces';

export interface IBook extends IDate {
    id: number;
    name: string;
    author: string;
    collectionBooks: ICollectionBook[];
    user: IUser;
    pages: IBookPage[];
    bookPageReads: IBookPageRead[];
}
