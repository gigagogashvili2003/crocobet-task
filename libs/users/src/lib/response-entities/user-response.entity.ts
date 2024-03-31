import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces';
import { Exclude } from 'class-transformer';
import { IBookPageRead } from '@app/book-page-reads/lib/interfaces';
import { IBook } from '@app/books/lib/interfaces';
import { ICollection } from '@app/collections/lib/interfaces';

export class UserResponseEntity implements IUser {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly email: string;

    @ApiHideProperty()
    @Exclude()
    public readonly password: string;

    @ApiHideProperty()
    @Exclude()
    public readonly verified: boolean;

    @ApiHideProperty()
    @Exclude()
    public readonly createdAt: Date;

    @ApiHideProperty()
    @Exclude()
    public readonly updatedAt: Date;
    collections: ICollection[];

    books: IBook[];

    bookPageReads: IBookPageRead[];

    constructor(partial: Partial<IUser>) {
        Object.assign(this, partial);
    }
}
