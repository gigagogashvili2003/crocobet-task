import { IBookPageRead } from '@app/book-page-reads/lib/interfaces';
import { IBook } from '@app/books/lib/interfaces';
import { ICollection } from '@app/collections/lib/interfaces';
import { IDate } from '@app/common';

export interface IUser extends IDate {
    id: number;
    name: string;
    email: string;
    password: string;
    verified: boolean;
    collections: ICollection[];
    books: IBook[];
    bookPageReads: IBookPageRead[];
}
