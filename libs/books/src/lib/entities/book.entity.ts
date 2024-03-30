import { BookPage } from '@app/book-pages/lib/entities';
import { CollectionBook } from '@app/collection-books/lib/entities';
import { BaseEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, unique: true })
    name: string;

    @OneToMany(() => CollectionBook, (collectionBook) => collectionBook.book)
    collectionBooks: CollectionBook[];

    @OneToMany(() => BookPage, (page) => page.book, { cascade: true })
    pages: BookPage[];
}
