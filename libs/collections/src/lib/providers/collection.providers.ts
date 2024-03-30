import { Provider } from '@nestjs/common';
import { COLLECTION_REPOSITORY, COLLECTION_SERVICE } from '../constants';
import { CollectionRepository } from '../repositories';
import { CollectionService } from '../services';

export const collectionProviders: Array<Provider> = [
    { provide: COLLECTION_REPOSITORY, useClass: CollectionRepository },
    { provide: COLLECTION_SERVICE, useClass: CollectionService },
];
