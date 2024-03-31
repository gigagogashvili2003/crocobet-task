import { COLLECTION_BOOK_SERVICE } from '@app/collection-books/lib/constants';
import { AddBookToCollectionDto, DeleteBookFromCollectionDto } from '@app/collection-books/lib/dtos';
import { CollectionBookResponseEntity } from '@app/collection-books/lib/response-entities';
import { AddBookToCollectionSchema, DeleteBookFromCollectionSchema } from '@app/collection-books/lib/schemas';
import { CollectionBookService } from '@app/collection-books/lib/services';
import { CollectionIdDto } from '@app/collections/lib/dtos';
import { CollectionIdSchema } from '@app/collections/lib/schemas/collection-id.schema';
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
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Collection books')
@Controller('collection-books')
export class CollectionBooksController {
    public constructor(
        @Inject(COLLECTION_BOOK_SERVICE) private readonly collectionBookService: CollectionBookService,
    ) {}

    @ApiResponse({ description: 'Adds book in a collection', status: HttpStatus.CREATED })
    @ApiResponse({ description: 'Collection not found', status: HttpStatus.NOT_FOUND })
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @ApiResponse({ description: 'Book already exists in collection', status: HttpStatus.CONFLICT })
    @HttpCode(HttpStatus.CREATED)
    @Post(':id/books')
    @UseGuards(AccessTokenGuard)
    public addBook(
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: CollectionIdDto,
        @Body(new JoiValidationPipe(AddBookToCollectionSchema)) addBookToCollectionDto: AddBookToCollectionDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionBookService.addBook(params.id, addBookToCollectionDto, currentUser);
    }

    @ApiResponse({ description: 'Removes book from a collection', status: HttpStatus.OK })
    @ApiResponse({ description: 'Collection not found', status: HttpStatus.NOT_FOUND })
    @ApiResponse({ description: 'Book not found', status: HttpStatus.NOT_FOUND })
    @ApiResponse({ description: 'Book not found in the collection', status: HttpStatus.NOT_FOUND })
    @HttpCode(HttpStatus.OK)
    @Delete(':id/books')
    @UseGuards(AccessTokenGuard)
    public removeBook(
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: CollectionIdDto,
        @Body(new JoiValidationPipe(DeleteBookFromCollectionSchema))
        deleteBookFromCollectionDto: DeleteBookFromCollectionDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionBookService.removeBook(params.id, deleteBookFromCollectionDto, currentUser);
    }

    @ApiResponse({
        description: 'Returns all book from a collection',
        status: HttpStatus.OK,
        type: [CollectionBookResponseEntity],
    })
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id/books')
    @UseGuards(AccessTokenGuard)
    public findAllBook(
        @Query(new JoiValidationPipe(PaginationQuerySchema)) paginationQueryDto: PaginationQueryDto,
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: CollectionIdDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionBookService.findAllBook(params.id, currentUser, paginationQueryDto);
    }
}
