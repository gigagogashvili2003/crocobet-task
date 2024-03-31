import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { IBook } from '@app/books/lib/interfaces';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class BookPageResponseEntity implements IBookPage {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly content: string;

    @ApiHideProperty()
    @Exclude()
    public readonly book: IBook;

    @ApiProperty()
    public readonly createdAt: Date;

    @ApiProperty()
    public readonly updatedAt: Date;

    constructor(partial: Partial<IBookPage>) {
        Object.assign(this, partial);
    }
}
