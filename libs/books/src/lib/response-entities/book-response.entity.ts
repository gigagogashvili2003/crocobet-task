import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { ICollectionBook } from '@app/collection-books/lib/interfaces';
import { IUser } from '@app/users/lib/interfaces';
import { IBook } from '../interfaces';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class BookResponseEntity implements IBook {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    lastReadPage: IBookPage;

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
