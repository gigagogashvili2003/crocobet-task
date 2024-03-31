import { BaseEntity } from '@app/common';
import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Collection } from '@app/collections';
import { Book } from '@app/books/lib/entities';

@Entity('collection_books')
@Unique(['collection', 'book'])
export class CollectionBook extends BaseEntity {
    @ManyToOne(() => Collection, (collection) => collection.collectionBooks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'collection_id' })
    collection: Collection;

    @ManyToOne(() => Book, (book) => book.collectionBooks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: Book;
}
