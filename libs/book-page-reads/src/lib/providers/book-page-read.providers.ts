import { Provider } from '@nestjs/common';
import { BOOK_PAGE_READ_REPOSITORY, BOOK_PAGE_READ_SERVICE } from '../constants/idnex';
import { BookPageReadRepository } from '../repositories';
import { BookPageReadService } from '../services';

export const bookPageReadProviders: Provider[] = [
    { provide: BOOK_PAGE_READ_REPOSITORY, useClass: BookPageReadRepository },
    { provide: BOOK_PAGE_READ_SERVICE, useClass: BookPageReadService },
];
