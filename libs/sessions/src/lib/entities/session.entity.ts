import { BaseEntity } from '@app/common'
import { Column, Entity } from 'typeorm'

@Entity('sessions')
export class Session extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, unique: true, name: 'refresh_token' })
    refreshToken: string
}
