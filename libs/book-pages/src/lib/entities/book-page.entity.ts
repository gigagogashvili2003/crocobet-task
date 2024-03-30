import { Book } from '@app/books/lib/entities';
import { BaseEntity } from '@app/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('book_pages')
export class BookPage extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    content: string;

    @ManyToOne(() => Book, (book) => book.pages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: Book;
}
