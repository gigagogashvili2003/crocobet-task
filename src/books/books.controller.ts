import { PageIdDto } from '@app/book-pages/lib/dtos';
import { BookPageResponseEntity } from '@app/book-pages/lib/response-entity';
import { PageIdSchema } from '@app/book-pages/lib/schemas';
import { BOOK_SERVICE } from '@app/books/lib/constants';
import { BookIdDto, CreateBookDto, DeleteBookParamDto } from '@app/books/lib/dtos';
import { BookResponseEntity } from '@app/books/lib/response-entities';
import { BookDetailsResponseEntity } from '@app/books/lib/response-entities/book-details-response.entity';
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
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Books')
@Controller('books')
export class BooksController {
    public constructor(@Inject(BOOK_SERVICE) private readonly bookService: BookService) {}

    @ApiResponse({ description: 'Creates new book', status: HttpStatus.CREATED })
    @ApiResponse({ description: 'Book already exists', status: HttpStatus.CONFLICT })
    @Post()
    @UseGuards(AccessTokenGuard)
    public create(
        @Body(new JoiValidationPipe(createBookSchema)) createBookDto: CreateBookDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.createBook(createBookDto, currentUser);
    }

    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @ApiResponse({ description: 'Deletes a single book', status: HttpStatus.OK })
    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    public delete(
        @Param(new JoiValidationPipe(BookIdSchema)) params: DeleteBookParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.deleteBook(params.id, currentUser);
    }

    @ApiResponse({ description: 'Updates a book', status: HttpStatus.OK })
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    public update(
        @Param(new JoiValidationPipe(BookIdSchema)) params: DeleteBookParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.deleteBook(params.id, currentUser);
    }

    @ApiResponse({ description: 'Returns all book', status: HttpStatus.OK, type: [BookResponseEntity] })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(AccessTokenGuard)
    public findAllBook(
        @CurrentUser() user: IUser,
        @Query(new JoiValidationPipe(PaginationQuerySchema)) paginationQueryDto: PaginationQueryDto,
    ) {
        return this.bookService.findAllBook(user, paginationQueryDto);
    }

    @ApiResponse({ description: 'Returns a single book', status: HttpStatus.OK, type: BookDetailsResponseEntity })
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    @UseGuards(AccessTokenGuard)
    public findBookDetails(
        @Param(new JoiValidationPipe(BookIdSchema)) params: DeleteBookParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.findBookDetails(params.id, currentUser);
    }

    @ApiResponse({ description: 'Returns a single page', status: HttpStatus.OK, type: BookPageResponseEntity })
    @ApiResponse({ description: 'Book page not found', status: HttpStatus.NOT_FOUND })
    @Get(':id/pages/:pageId')
    @UseGuards(AccessTokenGuard)
    public readPage(
        @Param(new JoiValidationPipe(BookIdSchema.concat(PageIdSchema))) params: BookIdDto & PageIdDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.readPage(params.id, params.pageId, currentUser);
    }

    @ApiResponse({ description: 'Changes last read page', status: HttpStatus.OK })
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @Patch(':id/pages')
    @UseGuards(AccessTokenGuard)
    public changeLastReadPage(
        @Param(new JoiValidationPipe(BookIdSchema)) params: DeleteBookParamDto,
        @Body(new JoiValidationPipe(PageIdSchema)) pageIdDto: PageIdDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.changeLastReadPage(params.id, pageIdDto.pageId, currentUser);
    }
}
