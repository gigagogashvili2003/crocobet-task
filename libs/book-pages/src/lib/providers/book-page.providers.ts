import { Provider } from '@nestjs/common';
import { BOOK_PAGE_REPOSITORY, BOOK_PAGE_SERVICE } from '../constants';
import { BookPageRepository } from '../repositories';
import { BookPageService } from '../services';

export const bookPageProviders: Array<Provider> = [
    { provide: BOOK_PAGE_REPOSITORY, useClass: BookPageRepository },
    { provide: BOOK_PAGE_SERVICE, useClass: BookPageService },
];
