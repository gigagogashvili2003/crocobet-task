import { Module } from '@nestjs/common';
import { bookProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './lib/entities';
import { BookPagesModule } from '@app/book-pages';
import { UtilsModule } from '@app/utils';
import { RedisModule } from '@app/redis';
import { BookPageReadsModule } from '@app/book-page-reads';

@Module({
    imports: [TypeOrmModule.forFeature([Book]), BookPagesModule, UtilsModule, RedisModule, BookPageReadsModule],
    providers: [...bookProviders],
    exports: [...bookProviders],
})
export class BooksLibModule {}
