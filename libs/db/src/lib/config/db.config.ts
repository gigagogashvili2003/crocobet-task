import { BookPageRead } from '@app/book-page-reads/lib/entities';
import { BookPage } from '@app/book-pages/lib/entities';
import { Book } from '@app/books/lib/entities';
import { CollectionBook } from '@app/collection-books/lib/entities';
import { Collection } from '@app/collections';
import { Session } from '@app/sessions/lib/entities';
import { User } from '@app/users/lib/entities';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_NAME'),
        // entities: ['dist/**/*.entity.js'],
        entities: [Session, User, Collection, Book, BookPage, CollectionBook, BookPageRead],
        synchronize: true,
    };
};
