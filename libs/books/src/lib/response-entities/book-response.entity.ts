import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { ICollectionBook } from '@app/collection-books/lib/interfaces';
import { IUser } from '@app/users/lib/interfaces';
import { IBook } from '../interfaces';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IBookPageRead } from '@app/book-page-reads/lib/interfaces';

export class BookResponseEntity implements IBook {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public author: string;

    bookPageReads: IBookPageRead[];

    @ApiHideProperty()
    @Exclude()
    public readonly collectionBooks: ICollectionBook[];

    @ApiHideProperty()
    @Exclude()
    public readonly user: IUser;

    public readonly pages: IBookPage[];

    @ApiProperty()
    public readonly createdAt: Date;

    @ApiProperty()
    public readonly updatedAt: Date;

    constructor(partial: Partial<IBook>) {
        Object.assign(this, partial);
    }
}
