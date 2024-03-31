import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { IBook } from '@app/books/lib/interfaces';
import { IDate } from '@app/common';
import { IUser } from '@app/users/lib/interfaces';

export interface IBookPageRead extends IDate {
    id: number;
    user: IUser;
    book: IBook;
    lastReadPage: IBookPage;
}
