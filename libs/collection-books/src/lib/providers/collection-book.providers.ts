import { Provider } from '@nestjs/common';
import { COLLECTION_BOOK_REPOSITORY, COLLECTION_BOOK_SERVICE } from '../constants';
import { CollectionBookRepository } from '../repositories';
import { CollectionBookService } from '../services';

export const collectionBookProviders: Array<Provider> = [
    { provide: COLLECTION_BOOK_REPOSITORY, useClass: CollectionBookRepository },
    { provide: COLLECTION_BOOK_SERVICE, useClass: CollectionBookService },
];
