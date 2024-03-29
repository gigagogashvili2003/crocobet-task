import { BaseEntity } from '@app/common'
import { Column, Entity } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    name: string

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string

    @Column({ type: 'varchar', nullable: false })
    password: string
}
