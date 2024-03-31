import { BaseEntity } from '@app/common';
import { Entity, ManyToOne, OneToOne, JoinColumn, Unique } from 'typeorm';
import { User } from '@app/users';
import { Book } from '@app/books/lib/entities';
import { BookPage } from '@app/book-pages/lib/entities';

@Entity('book_page_reads')
@Unique(['user', 'book'])
export class BookPageRead extends BaseEntity {
    @ManyToOne(() => User, (user) => user.bookPageReads, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Book, (book) => book.bookPageReads, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: Book;

    @OneToOne(() => BookPage)
    @JoinColumn({ name: 'last_read_page_id' })
    lastReadPage: BookPage;
}
