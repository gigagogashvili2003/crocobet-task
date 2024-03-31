import { Injectable } from '@nestjs/common';
import { Book } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBookRepository } from '../interfaces';
import { BaseAbstractRepository } from '@app/common';

@Injectable()
export class BookRepository extends BaseAbstractRepository<Book> implements IBookRepository {
    public constructor(@InjectRepository(Book) private readonly BookRepository: Repository<Book>) {
        super(BookRepository);
    }
}
