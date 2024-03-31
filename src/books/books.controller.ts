import { CreateBookPageDto, PageIdDto } from '@app/book-pages/lib/dtos';
import { BookPageResponseEntity } from '@app/book-pages/lib/response-entity';
import { CreateBookPageSchema, PageIdSchema } from '@app/book-pages/lib/schemas';
import { BOOK_SERVICE } from '@app/books/lib/constants';
import { BookIdDto, CreateBookDto, DeleteBookParamDto, UpdateBookDto } from '@app/books/lib/dtos';
import { BookResponseEntity } from '@app/books/lib/response-entities';
import { BookDetailsResponseEntity } from '@app/books/lib/response-entities/book-details-response.entity';
import { BookIdSchema, UpdateBookSchema, createBookSchema } from '@app/books/lib/schemas';
import { BookService } from '@app/books/lib/services';
import { AccessTokenGuard, PaginationQueryDto } from '@app/common';
import { ThrottlerConfig } from '@app/common/lib/config';
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
    HttpCode,
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
import { Throttle } from '@nestjs/throttler';

@ApiBearerAuth()
@ApiTags('Books')
@Controller('books')
export class BooksController {
    public constructor(@Inject(BOOK_SERVICE) private readonly bookService: BookService) {}

    @Throttle(ThrottlerConfig.SHORT)
    @ApiResponse({ description: 'Creates new book', status: HttpStatus.CREATED })
    @ApiResponse({ description: 'Book already exists', status: HttpStatus.CONFLICT })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseGuards(AccessTokenGuard)
    public create(
        @Body(new JoiValidationPipe(createBookSchema)) createBookDto: CreateBookDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.createBook(createBookDto, currentUser);
    }

    @Throttle(ThrottlerConfig.SHORT)
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @ApiResponse({ description: 'Deletes a single book', status: HttpStatus.OK })
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    public delete(
        @Param(new JoiValidationPipe(BookIdSchema)) params: DeleteBookParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.deleteBook(params.id, currentUser);
    }

    @Throttle(ThrottlerConfig.SHORT)
    @ApiResponse({ description: 'Updates a book', status: HttpStatus.OK })
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    public update(
        @Param(new JoiValidationPipe(BookIdSchema)) params: BookIdDto,
        @Body(new JoiValidationPipe(UpdateBookSchema)) updateBookDto: UpdateBookDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.updateBook(params.id, updateBookDto, currentUser);
    }

    @Throttle(ThrottlerConfig.SHORT)
    @ApiResponse({ description: 'Returns all book', status: HttpStatus.OK, type: [BookResponseEntity] })
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.OK)
    @Get()
    @UseGuards(AccessTokenGuard)
    public findAllBook(
        @CurrentUser() user: IUser,
        @Query(new JoiValidationPipe(PaginationQuerySchema)) paginationQueryDto: PaginationQueryDto,
    ) {
        return this.bookService.findAllBook(user, paginationQueryDto);
    }

    @Throttle(ThrottlerConfig.SHORT)
    @ApiResponse({ description: 'Returns a single book', status: HttpStatus.OK, type: BookDetailsResponseEntity })
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    @UseGuards(AccessTokenGuard)
    public findBookDetails(
        @Param(new JoiValidationPipe(BookIdSchema)) params: DeleteBookParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.findBookDetails(params.id, currentUser);
    }

    @Throttle(ThrottlerConfig.SHORT)
    @ApiResponse({ description: 'Returns a single page', status: HttpStatus.OK, type: BookPageResponseEntity })
    @ApiResponse({ description: 'Book page not found', status: HttpStatus.NOT_FOUND })
    @HttpCode(HttpStatus.OK)
    @Get(':id/pages/:pageId')
    @UseGuards(AccessTokenGuard)
    public readPage(
        @Param(new JoiValidationPipe(BookIdSchema.concat(PageIdSchema))) params: BookIdDto & PageIdDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.bookService.readPage(params.id, params.pageId, currentUser);
    }

    @Throttle(ThrottlerConfig.SHORT)
    @Post(':id')
    public addPage(
        @Param(new JoiValidationPipe(BookIdSchema)) params: BookIdDto,
        @CurrentUser() currentUser: IUser,
        @Body(new JoiValidationPipe(CreateBookPageSchema)) createBookPageDto: CreateBookPageDto,
    ) {
        return this.bookService.addPage(params.id, currentUser, createBookPageDto);
    }

    @Throttle(ThrottlerConfig.SHORT)
    @ApiResponse({ description: 'Changes last read page', status: HttpStatus.OK })
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @HttpCode(HttpStatus.OK)
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
