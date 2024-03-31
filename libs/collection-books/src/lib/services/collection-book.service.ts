import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { COLLECTION_BOOK_REPOSITORY } from '../constants';
import { ICollectionBook, ICollectionBookRepository } from '../interfaces';
import { COLLECTION_SERVICE } from '@app/collections/lib/constants';
import { CollectionService } from '@app/collections/lib/services';
import { AddBookToCollectionDto } from '../dtos';
import { IUser } from '@app/users/lib/interfaces';
import { BOOK_SERVICE } from '@app/books/lib/constants';
import { BookService } from '@app/books/lib/services';
import { ICollection } from '@app/collections/lib/interfaces';
import { IBook } from '@app/books/lib/interfaces';
import {
    BookAlreadyExistsInCollectionException,
    BookNotFoundException,
    BookNotFoundInCollectionException,
} from '@app/common/lib/exceptions';
import { PromiseGenericResponse } from '@app/common/lib/types';
import { PaginationService, UTILS_SERVICE, UtilsService } from '@app/utils';
import { IPageInfo, PaginationProps, PaginationQueryDto } from '@app/common';
import { CollectionBookResponseEntity } from '../response-entities';

@Injectable()
export class CollectionBookService extends PaginationService<ICollectionBook> {
    public constructor(
        @Inject(COLLECTION_BOOK_REPOSITORY) private readonly collectionBookRepository: ICollectionBookRepository,
        @Inject(COLLECTION_SERVICE) private readonly collectionService: CollectionService,
        @Inject(BOOK_SERVICE) private readonly bookService: BookService,
    ) {
        super();
    }

    public async addBook(
        id: number,
        addBookToCollectionDto: AddBookToCollectionDto,
        currentUser: IUser,
    ): PromiseGenericResponse<null> {
        const { bookId } = addBookToCollectionDto;

        const collection = await this.collectionService.checkIfCollectionExists(id, currentUser);

        const book = await this.bookService.findOneById(bookId, currentUser);

        if (!book) {
            throw new BookNotFoundException();
        }

        const collectionBook = await this.findOne(collection, book);

        if (collectionBook) {
            throw new BookAlreadyExistsInCollectionException();
        }

        await this.createAndSave({ book, collection });

        return { status: HttpStatus.CREATED, message: 'Book has added to the collection' };
    }

    public async removeBook(
        id: number,
        addBookToCollectionDto: AddBookToCollectionDto,
        currentUser: IUser,
    ): PromiseGenericResponse<null> {
        const { bookId } = addBookToCollectionDto;

        const collection = await this.collectionService.checkIfCollectionExists(id, currentUser);

        const book = await this.bookService.checkIfBookExists(bookId, currentUser);

        const hasDeleted = await this.delete(collection, book);

        if (!hasDeleted) {
            throw new BookNotFoundInCollectionException();
        }

        return { status: HttpStatus.CREATED, message: 'Book has deleted from the collection' };
    }

    public async findAllBook(
        id: number,
        currentUser: IUser,
        paginationQueryDto: PaginationQueryDto,
    ): PromiseGenericResponse<{ books: ICollectionBook[]; pageInfo: IPageInfo }> {
        const { skip, take } = this.getPaginationProps(paginationQueryDto);

        const collection = await this.collectionService.checkIfCollectionExists(id, currentUser);

        const [collectionBooks, collectionBooksCount] = await this.findAllAndCount(collection, { skip, take });

        const { items, pageInfo } = this.paginate(
            { items: collectionBooks, totalCount: collectionBooksCount },
            { page: skip, currentPage: paginationQueryDto.page, pageSize: take },
        );

        const serializedCollectionBooks = this.serialize(items);

        return {
            status: HttpStatus.CREATED,
            message: 'Book has deleted from the collection',
            body: { books: serializedCollectionBooks, pageInfo },
        };
    }

    public serialize(collectionBooks: ICollectionBook[]) {
        return collectionBooks.map((collectionBook) => new CollectionBookResponseEntity(collectionBook));
    }

    public createAndSave(collectionBook: Partial<ICollectionBook>) {
        const newCollectionBook = this.collectionBookRepository.create(collectionBook);
        return this.collectionBookRepository.save(newCollectionBook);
    }

    public findOne(collection: ICollection, book: IBook) {
        return this.collectionBookRepository.findOneByCondition({ where: { collection, book } });
    }

    public findAllAndCount(collection: ICollection, pagination: PaginationProps) {
        return this.collectionBookRepository.findAllAndCount({
            where: { collection },
            relations: { book: true },
            ...pagination,
        });
    }

    public delete(collection: ICollection, book: IBook) {
        return this.collectionBookRepository.delete({ collection, book });
    }
}
