import { CollectionBook } from '@app/collection-books/lib/entities';
import { BaseEntity } from '@app/common';
import { User } from '@app/users';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';

@Entity('collections')
@Unique(['name', 'user'])
export class Collection extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ManyToOne(() => User, (user) => user.collections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => CollectionBook, (collectionBook) => collectionBook.collection)
    collectionBooks: CollectionBook[];
}
