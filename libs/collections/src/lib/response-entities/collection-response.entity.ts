import { IUser } from '@app/users/lib/interfaces';
import { ICollection } from '../interfaces';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CollectionResponseEntity implements ICollection {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @Exclude()
    @ApiHideProperty()
    public readonly user: IUser;

    @ApiProperty()
    public readonly createdAt: Date;

    @ApiProperty()
    public readonly updatedAt: Date;

    constructor(partial: Partial<ICollection>) {
        Object.assign(this, partial);
    }
}
