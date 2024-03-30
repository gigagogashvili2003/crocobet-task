import { IBook } from '@app/books/lib/interfaces';
import { ICollection } from '@app/collections/lib/interfaces';
import { IDate } from '@app/common';

export interface ICollectionBook extends IDate {
    id: number;
    collection: ICollection;
    book: IBook;
}
