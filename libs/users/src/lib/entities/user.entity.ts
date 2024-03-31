import { BookPageRead } from '@app/book-page-reads/lib/entities';
import { Book } from '@app/books/lib/entities';
import { Collection } from '@app/collections';
import { BaseEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    verified: boolean;

    @OneToMany(() => Collection, (collection) => collection.user)
    collections: Collection[];

    @OneToMany(() => Book, (book) => book.user)
    books: Book[];

    @OneToMany(() => BookPageRead, (bookPageRead) => bookPageRead.user)
    bookPageReads: BookPageRead[];
}
