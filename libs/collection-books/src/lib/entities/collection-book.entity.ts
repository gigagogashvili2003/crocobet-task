import { BaseEntity } from '@app/common';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Collection } from '@app/collections';
import { Book } from '@app/books/lib/entities';

@Entity('collection_books')
export class CollectionBook extends BaseEntity {
    @ManyToOne(() => Collection, (collection) => collection.collectionBooks)
    @JoinColumn({ name: 'collection_id' })
    collection: Collection;

    @ManyToOne(() => Book, (book) => book.collectionBooks)
    @JoinColumn({ name: 'book_id' })
    book: Book;
}
