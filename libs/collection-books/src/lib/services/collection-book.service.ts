import { Inject, Injectable } from '@nestjs/common';
import { COLLECTION_BOOK_REPOSITORY } from '../constants';
import { ICollectionBookRepository } from '../interfaces';

@Injectable()
export class CollectionBookService {
    public constructor(
        @Inject(COLLECTION_BOOK_REPOSITORY) private readonly collectionBookRepository: ICollectionBookRepository,
    ) {}
}
