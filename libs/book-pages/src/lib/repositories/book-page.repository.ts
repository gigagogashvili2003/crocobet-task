import { Injectable } from '@nestjs/common';
import { BookPage } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '@app/common';
import { IBookPageRepository } from '../interfaces';

@Injectable()
export class BookPageRepository extends BaseAbstractRepository<BookPage> implements IBookPageRepository {
    public constructor(@InjectRepository(BookPage) private readonly BookPageRepository: Repository<BookPage>) {
        super(BookPageRepository);
    }
}
