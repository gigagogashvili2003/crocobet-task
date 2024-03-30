import { BOOK_SERVICE } from '@app/books/lib/constants';
import { BookIdDto, CreateBookDto, DeleteBookParamDto } from '@app/books/lib/dtos';
import { BookIdSchema, createBookSchema } from '@app/books/lib/schemas';
import { BookService } from '@app/books/lib/services';
import { AccessTokenGuard } from '@app/common';
import { CurrentUser } from '@app/common/lib/decorators';
import { JoiValidationPipe } from '@app/common/lib/pipes';
import { IUser } from '@app/users/lib/interfaces';
import { Body, Controller, Delete, Inject, Param, Post, UseGuards } from '@nestjs/common';

@Controller('books')
export class BooksController {
    public constructor(@Inject(BOOK_SERVICE) private readonly bookService: BookService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    public create(
        @Body(new JoiValidationPipe(createBookSchema)) createBookDto: CreateBookDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.createBook(createBookDto, currentUser);
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    public delete(
        @Param(new JoiValidationPipe(BookIdSchema)) params: DeleteBookParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.deleteBook(params.id, currentUser);
    }
}
