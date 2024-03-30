import { Injectable } from '@nestjs/common';
import { Collection } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICollectionRepository } from '../interfaces';
import { BaseAbstractRepository } from '@app/common';

@Injectable()
export class CollectionRepository extends BaseAbstractRepository<Collection> implements ICollectionRepository {
    public constructor(@InjectRepository(Collection) private readonly CollectionRepository: Repository<Collection>) {
        super(CollectionRepository);
    }
}
