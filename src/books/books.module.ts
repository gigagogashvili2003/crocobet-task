import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksLibModule } from '@app/books';

@Module({
    imports: [BooksLibModule],
    controllers: [BooksController],
})
export class BooksModule {}
