import { Injectable } from '@nestjs/common';
import { BookPage } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBookPage } from '../interfaces';
import { BaseAbstractRepository } from '@app/common';

@Injectable()
export class BookPageRepository extends BaseAbstractRepository<BookPage> implements IBookPage {
    public constructor(@InjectRepository(BookPage) private readonly BookPageRepository: Repository<BookPage>) {
        super(BookPageRepository);
    }
}
