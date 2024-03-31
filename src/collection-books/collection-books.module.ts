import { Module } from '@nestjs/common';
import { CollectionBooksController } from './collection-books.controller';
import { CollectionBooksLibModule } from '@app/collection-books';

@Module({
    imports: [CollectionBooksLibModule],
    controllers: [CollectionBooksController],
})
export class CollectionBooksModule {}
