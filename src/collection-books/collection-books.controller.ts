import { COLLECTION_BOOK_SERVICE } from '@app/collection-books/lib/constants';
import { AddBookToCollectionDto, DeleteBookFromCollectionDto } from '@app/collection-books/lib/dtos';
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
    Inject,
    Param,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

@Controller('collection-books')
export class CollectionBooksController {
    public constructor(
        @Inject(COLLECTION_BOOK_SERVICE) private readonly collectionBookService: CollectionBookService,
    ) {}

    @Post(':id/books')
    @UseGuards(AccessTokenGuard)
    public addBook(
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: CollectionIdDto,
        @Body(new JoiValidationPipe(AddBookToCollectionSchema)) addBookToCollectionDto: AddBookToCollectionDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionBookService.addBook(params.id, addBookToCollectionDto, currentUser);
    }

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
