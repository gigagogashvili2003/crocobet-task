import { IBook } from '@app/books/lib/interfaces';
import { BookResponseEntity } from '@app/books/lib/response-entities';
import { ICollectionBook } from '@app/collection-books/lib/interfaces';
import { ICollection } from '@app/collections/lib/interfaces';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

export class CollectionBookResponseEntity implements ICollectionBook {
    @ApiHideProperty()
    @Exclude()
    public readonly id: number;

    @ApiHideProperty()
    @Exclude()
    public readonly collection: ICollection;

    @Type(() => BookResponseEntity)
    public readonly book: BookResponseEntity;

    @ApiHideProperty()
    @Exclude()
    public readonly createdAt: Date;

    @ApiHideProperty()
    @Exclude()
    public readonly updatedAt: Date;

    constructor(partial: Partial<ICollectionBook>) {
        Object.assign(this, partial);
    }
}
