import { BaseEntity } from '@app/common';
import { User } from '@app/users';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Chat extends BaseEntity {
    @ManyToOne(() => User, (user) => user)
    @JoinColumn({ name: 'user_1_id' })
    user1: User;

    @ManyToOne(() => User, (user) => user)
    @JoinColumn({ name: 'user_2_id' })
    user2: User;
}
