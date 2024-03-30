import { Module } from '@nestjs/common';
import { bookProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './lib/entities';
import { BookPagesModule } from '@app/book-pages';
import { UtilsModule } from '@app/utils';

@Module({
    imports: [TypeOrmModule.forFeature([Book]), BookPagesModule, UtilsModule],
    providers: [...bookProviders],
    exports: [...bookProviders],
})
export class BooksLibModule {}
