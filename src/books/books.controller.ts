import { PageIdDto } from '@app/book-pages/lib/dtos';
import { PageIdSchema } from '@app/book-pages/lib/schemas';
import { BOOK_SERVICE } from '@app/books/lib/constants';
import { BookIdDto, CreateBookDto, DeleteBookParamDto } from '@app/books/lib/dtos';
import { BookIdSchema, createBookSchema } from '@app/books/lib/schemas';
import { BookService } from '@app/books/lib/services';
import { AccessTokenGuard, PaginationQueryDto } from '@app/common';
import { CurrentUser } from '@app/common/lib/decorators';
import { JoiValidationPipe } from '@app/common/lib/pipes';
import { PaginationQuerySchema } from '@app/common/lib/schema';
import { IUser } from '@app/users/lib/interfaces';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

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

    @Get()
    @UseGuards(AccessTokenGuard)
    public findAllBook(
        @CurrentUser() user: IUser,
        @Query(new JoiValidationPipe(PaginationQuerySchema)) paginationQueryDto: PaginationQueryDto,
    ) {
        return this.bookService.findAllBook(user, paginationQueryDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    @UseGuards(AccessTokenGuard)
    public findBookDetails(
        @Param(new JoiValidationPipe(BookIdSchema)) params: DeleteBookParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.findBookDetails(params.id, currentUser);
    }

    @Get(':id/pages/:pageId')
    @UseGuards(AccessTokenGuard)
    public readPage(
        @Param(new JoiValidationPipe(BookIdSchema.concat(PageIdSchema))) params: BookIdDto & PageIdDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.readPage(params.id, params.pageId, currentUser);
    }
}
