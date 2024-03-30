import { IBook } from '@app/books/lib/interfaces';
import { IDate } from '@app/common';

export interface IBookPage extends IDate {
    id: number;
    content: string;
    book: IBook;
}
