import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './lib/entities';
import { collectionProviders } from './lib/providers';
import { UtilsModule } from '@app/utils';
import { BooksLibModule } from '@app/books';

@Module({
    imports: [TypeOrmModule.forFeature([Collection]), UtilsModule],
    providers: [...collectionProviders],
    exports: [...collectionProviders],
})
export class CollectionsLibModule {}
