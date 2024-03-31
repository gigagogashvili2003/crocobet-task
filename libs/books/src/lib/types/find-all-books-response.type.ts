import { IPageInfo } from '@app/common';
import { IBook } from '../interfaces';

export type FindAllBooks = { books: Array<IBook>; pageInfo: IPageInfo };
