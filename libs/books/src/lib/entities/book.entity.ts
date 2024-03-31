import { BookPage } from '@app/book-pages/lib/entities';
import { CollectionBook } from '@app/collection-books/lib/entities';
import { BaseEntity } from '@app/common';
import { User } from '@app/users';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, unique: true })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    author: string;

    @OneToMany(() => CollectionBook, (collectionBook) => collectionBook.book)
    collectionBooks: CollectionBook[];

    @ManyToOne(() => User, (user) => user.books)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => BookPage, (page) => page.book, { cascade: true })
    pages: BookPage[];

    @OneToOne(() => BookPage, { nullable: true })
    @JoinColumn({ name: 'last_read_page_id' })
    lastReadPage: BookPage;
}
