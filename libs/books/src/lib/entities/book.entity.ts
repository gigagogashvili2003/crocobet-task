import { BaseEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, unique: true })
    name: string;
}
