import { Module } from '@nestjs/common';
import { collectionBookProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionBook } from './lib/entities';

@Module({
    imports: [TypeOrmModule.forFeature([CollectionBook])],
    providers: [...collectionBookProviders],
    exports: [...collectionBookProviders],
})
export class CollectionBooksModule {}
