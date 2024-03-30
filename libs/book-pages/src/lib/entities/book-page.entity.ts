import { Book } from '@app/books/lib/entities';
import { BaseEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('book_pages')
export class BookPage extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    @ManyToOne(() => Book, (book) => book.pages)
    book: Book;
}
