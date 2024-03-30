import { CreateBookPageDto } from '@app/book-pages/lib/dtos';
import { Type } from 'class-transformer';

export class CreateBookDto {
    readonly name: string;

    @Type(() => CreateBookPageDto)
    readonly pages: Array<{ content: string }>;
}
