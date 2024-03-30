import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '@app/common';
import { CollectionBook } from '../entities';
import { ICollectionBookRepository } from '../interfaces';

@Injectable()
export class CollectionBookRepository
    extends BaseAbstractRepository<CollectionBook>
    implements ICollectionBookRepository
{
    public constructor(
        @InjectRepository(CollectionBook) private readonly CollectionBookRepository: Repository<CollectionBook>,
    ) {
        super(CollectionBookRepository);
    }
}
