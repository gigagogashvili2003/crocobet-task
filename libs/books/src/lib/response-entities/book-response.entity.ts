import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { ICollectionBook } from '@app/collection-books/lib/interfaces';
import { IUser } from '@app/users/lib/interfaces';
import { IBook } from '../interfaces';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BookPageResponseEntity } from '@app/book-pages/lib/response-entity';

export class BookResponseEntity implements IBook {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public author: string;

    @Type(() => BookPageResponseEntity)
    @Expose({ name: 'lastReadPage' })
    public readonly lastReadPage: BookPageResponseEntity;

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
