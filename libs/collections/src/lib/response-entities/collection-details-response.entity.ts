import { ICollection } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseEntity } from '@app/users/lib/response-entities/user-response.entity';

export class CollectionDetailsResponseEntity implements ICollection {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @Type(() => UserResponseEntity)
    @Expose({ name: 'owner' })
    public readonly user: UserResponseEntity;

    @ApiProperty()
    public readonly createdAt: Date;

    @ApiProperty()
    public readonly updatedAt: Date;

    constructor(partial: Partial<ICollection>) {
        Object.assign(this, partial);
    }
}
