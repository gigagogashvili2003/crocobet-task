import { Module } from '@nestjs/common';
import { bookProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './lib/entities';
import { BookPagesModule } from '@app/book-pages';
import { UtilsModule } from '@app/utils';
import { RedisModule } from '@app/redis';

@Module({
    imports: [TypeOrmModule.forFeature([Book]), BookPagesModule, UtilsModule, RedisModule],
    providers: [...bookProviders],
    exports: [...bookProviders],
})
export class BooksLibModule {}
