import { Provider } from '@nestjs/common';
import { BOOK_REPOSITORY, BOOK_SERVICE } from '../constants';
import { BookRepository } from '../repositories';
import { BookService } from '../services';

export const bookProviders: Array<Provider> = [
    { provide: BOOK_REPOSITORY, useClass: BookRepository },
    { provide: BOOK_SERVICE, useClass: BookService },
];
