import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces';
import { Exclude } from 'class-transformer';
import { IBookPageRead } from '@app/book-page-reads/lib/interfaces';
import { IBook } from '@app/books/lib/interfaces';
import { ICollection } from '@app/collections/lib/interfaces';

export class ProfileResponseEntity implements IUser {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly email: string;

    @ApiHideProperty()
    @Exclude()
    public readonly password: string;

    @ApiProperty()
    public readonly verified: boolean;

    @ApiProperty()
    public readonly createdAt: Date;

    @ApiProperty()
    public readonly updatedAt: Date;

    collections: ICollection[];
    books: IBook[];
    bookPageReads: IBookPageRead[];

    constructor(partial: Partial<IUser>) {
        Object.assign(this, partial);
    }
}
