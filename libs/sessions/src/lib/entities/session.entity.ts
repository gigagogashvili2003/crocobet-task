import { BaseEntity } from '@app/common';
import { User } from '@app/users';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('sessions')
export class Session extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, unique: true, name: 'refresh_token' })
    refreshToken: string;

    @OneToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
