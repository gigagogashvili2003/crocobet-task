import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { ICollectionBook } from '@app/collection-books/lib/interfaces';
import { IUser } from '@app/users/lib/interfaces';
import { IBook } from '../interfaces';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BookPageResponseEntity } from '@app/book-pages/lib/response-entity';
import { UserResponseEntity } from '@app/users/lib/response-entities/user-response.entity';
import { IBookPageRead } from '@app/book-page-reads/lib/interfaces';

export class BookDetailsResponseEntity implements IBook {
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

    @Type(() => UserResponseEntity)
    @Expose({ name: 'owner' })
    public readonly user: UserResponseEntity;

    @Type(() => BookPageResponseEntity)
    public readonly pages: BookPageResponseEntity[];

    @ApiProperty()
    public readonly createdAt: Date;

    @ApiProperty()
    public readonly updatedAt: Date;

    constructor(partial: Partial<IBook>) {
        Object.assign(this, partial);
    }
}
