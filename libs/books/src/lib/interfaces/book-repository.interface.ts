import { IBaseRepository } from '@app/common';
import { Book } from '../entities';

export interface IBookRepository extends IBaseRepository<Book> {}
