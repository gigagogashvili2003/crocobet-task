import { CollectionBook } from '@app/collection-books/lib/entities';
import { BaseEntity } from '@app/common';
import { User } from '@app/users';
import { IUser } from '@app/users/lib/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('collections')
export class Collection extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, unique: true })
    name: string;

    @ManyToOne(() => User, (user) => user.collections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: IUser;

    @OneToMany(() => CollectionBook, (collectionBook) => collectionBook.collection)
    collectionBooks: CollectionBook[];
}
