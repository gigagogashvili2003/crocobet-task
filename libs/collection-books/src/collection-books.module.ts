import { Module } from '@nestjs/common';
import { collectionBookProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionBook } from './lib/entities';
import { BooksLibModule } from '@app/books';
import { CollectionsLibModule } from '@app/collections';
import { UtilsModule } from '@app/utils';

@Module({
    imports: [TypeOrmModule.forFeature([CollectionBook]), CollectionsLibModule, BooksLibModule, UtilsModule],
    providers: [...collectionBookProviders],
    exports: [...collectionBookProviders],
})
export class CollectionBooksLibModule {}
