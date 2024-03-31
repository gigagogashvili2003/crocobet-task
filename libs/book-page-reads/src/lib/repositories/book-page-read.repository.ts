import { Injectable } from '@nestjs/common';
import { BookPageRead } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '@app/common';
import { IBookPageReadRepository } from '../interfaces';

@Injectable()
export class BookPageReadRepository extends BaseAbstractRepository<BookPageRead> implements IBookPageReadRepository {
    public constructor(
        @InjectRepository(BookPageRead) private readonly BookPageReadRepository: Repository<BookPageRead>,
    ) {
        super(BookPageReadRepository);
    }
}
