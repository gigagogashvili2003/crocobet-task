import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../constants';
import { IBook, IBookRepository } from '../interfaces';
import { CreateBookDto, UpdateBookDto } from '../dtos';
import { IUser } from '@app/users/lib/interfaces';
import {
    BookAlreadyExistsException,
    BookNotFoundException,
    BookPageReadNotFoundException,
} from '@app/common/lib/exceptions';
import { BOOK_PAGE_SERVICE } from '@app/book-pages/lib/constants';
import { BookPageService } from '@app/book-pages/lib/services';
import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { PromiseGenericResponse } from '@app/common/lib/types';
import { PaginationService, UTILS_SERVICE, UtilsService } from '@app/utils';
import { BookResponseEntity } from '../response-entities';
import { IPageInfo, PaginationProps, PaginationQueryDto } from '@app/common';
import { BookDetailsResponseEntity } from '../response-entities/book-details-response.entity';
import { RedisHelperService, RedisService } from '@app/redis';
import { REDIS_HELPER_SERVICE, REDIS_SERVICE } from '@app/redis/lib/constants';
import { RedisTTL } from '@app/redis/lib/enums';
import { FindAllBooks } from '../types';
import { BOOK_PAGE_READ_SERVICE } from '@app/book-page-reads/lib/constants/idnex';
import { BookPageReadService } from '@app/book-page-reads/lib/services';
import { CreateBookPageDto } from '@app/book-pages/lib/dtos';

@Injectable()
export class BookService extends PaginationService<IBook> {
    public constructor(
        @Inject(BOOK_REPOSITORY) private readonly bookRepository: IBookRepository,
        @Inject(BOOK_PAGE_SERVICE) private readonly bookPageService: BookPageService,
        @Inject(REDIS_SERVICE) private readonly redisService: RedisService,
        @Inject(REDIS_HELPER_SERVICE) private readonly redisHelperService: RedisHelperService,
        @Inject(BOOK_PAGE_READ_SERVICE) private readonly bookPageReadService: BookPageReadService,
    ) {
        super();
    }

    public async createBook(createBookDto: CreateBookDto, currentUser: IUser): PromiseGenericResponse<null> {
        const { name, pages, author } = createBookDto;

        const bookExists = await this.findOneByName(name, currentUser);

        if (bookExists) {
            throw new BookAlreadyExistsException();
        }

        let bookPages: IBookPage[] = [];
        if (pages.length) {
            bookPages = this.bookPageService.preloadBookPages(pages);
        }

        await this.createAndSave({ user: currentUser, name, author, pages: bookPages });

        return { status: HttpStatus.CREATED, message: 'New book has created' };
    }

    public async deleteBook(id: number, user: IUser): PromiseGenericResponse<null> {
        const hasDeleted = await this.delete(id, user);

        if (!hasDeleted) {
            throw new BookNotFoundException();
        }

        return { status: HttpStatus.OK, message: 'Book has deleted' };
    }

    public async updateBook(id: number, updateBookDto: UpdateBookDto, user: IUser): PromiseGenericResponse<null> {
        const { author, name } = updateBookDto;

        const book = await this.checkIfBookExists(id, user);

        await this.update(book.id, user, { author, name });

        return { status: HttpStatus.OK, message: 'Book has updated succesfully!' };
    }

    public async findAllBook(
        user: IUser,
        paginationQueryDto: PaginationQueryDto,
    ): PromiseGenericResponse<FindAllBooks> {
        const { skip, take } = this.getPaginationProps(paginationQueryDto);

        const cacheKey = this.redisHelperService.generateBookCacheKey(user.id);
        const cacheExists = await this.redisService.get(cacheKey);

        if (cacheExists) {
            const parsedData: FindAllBooks = JSON.parse(cacheExists);
            return { status: HttpStatus.OK, body: { ...parsedData } };
        }

        const [books, booksCount] = await this.findAllAndCount(user, { skip, take });

        const { items, pageInfo } = this.paginate(
            { items: books, totalCount: booksCount },
            { page: skip, currentPage: paginationQueryDto.page, pageSize: take },
        );

        const serializedBooks = this.serialize(items);

        await this.redisService.set(
            cacheKey,
            JSON.stringify({ books: serializedBooks, pageInfo }),
            RedisTTL.ONE_MINUTE,
        );

        return { status: HttpStatus.OK, body: { books: serializedBooks, pageInfo } };
    }

    public async findBookDetails(id: number, user: IUser): PromiseGenericResponse<{ book: IBook }> {
        const book = await this.checkIfBookExists(id, user, true);

        const serializedBookDetails = this.serializeBookDetails(book);

        return { status: HttpStatus.OK, body: { book: serializedBookDetails } };
    }

    public async readPage(
        bookId: number,
        pageId: number,
        currentUser: IUser,
    ): PromiseGenericResponse<{ page: IBookPage }> {
        const book = await this.checkIfBookExists(bookId, currentUser);

        const page = await this.bookPageService.checkIfPageExists(pageId, book);

        const bookPageReadExists = await this.bookPageReadService.findOne(currentUser, book);

        if (bookPageReadExists) {
            await this.bookPageReadService.update(currentUser, book, { lastReadPage: page });
        } else {
            await this.bookPageReadService.createAndSave({ book, user: currentUser, lastReadPage: page });
        }

        const serializedPage = this.bookPageService.serialize(page);

        return { status: HttpStatus.OK, body: { page: serializedPage } };
    }

    public async addPage(
        bookId: number,
        currentUser: IUser,
        createBookPageDto: CreateBookPageDto,
    ): PromiseGenericResponse<null> {
        const { content } = createBookPageDto;

        const book = await this.checkIfBookExists(bookId, currentUser);

        await this.bookPageService.createAndSave({ book, content });

        return { status: HttpStatus.OK, message: 'Page has added to the book' };
    }

    public async changeLastReadPage(bookId: number, pageId: number, currentUser: IUser): PromiseGenericResponse<null> {
        const book = await this.checkIfBookExists(bookId, currentUser, true);

        const newPage = await this.bookPageService.checkIfPageExists(pageId, book);

        const bookPageReadExists = await this.bookPageReadService.findOne(currentUser, book);

        if (!bookPageReadExists) {
            throw new BookPageReadNotFoundException();
        }

        await this.bookPageReadService.update(currentUser, book, { lastReadPage: newPage });

        return { status: HttpStatus.OK, message: 'Last read page has updated!' };
    }

    public async checkIfBookExists(id: number, user: IUser, withRelations?: boolean) {
        let book: IBook = null;

        if (!withRelations) {
            book = await this.findOneById(id, user);
        } else {
            book = await this.findOneWithRelations(id, user);
        }

        if (!book) {
            throw new BookNotFoundException();
        }

        return book;
    }

    public serialize(books: Array<IBook>) {
        return books.map((book) => new BookResponseEntity(book));
    }

    public serializeBookDetails(book: IBook) {
        return new BookDetailsResponseEntity(book);
    }

    public findOneById(id: number, user: IUser) {
        return this.bookRepository.findOneByCondition({ where: { id, user } });
    }

    public findAllAndCount(user: IUser, pagination: PaginationProps) {
        return this.bookRepository.findAllAndCount({
            where: { user },
            ...pagination,
        });
    }

    public findOneByName(name: string, user: IUser) {
        return this.bookRepository.findOneByCondition({ where: { name, user } });
    }

    public findOneWithRelations(id: number, user: IUser) {
        return this.bookRepository.findOneByCondition({
            where: { id, user },
            relations: { pages: true, collectionBooks: true, user: true },
        });
    }

    public update(id: number, user: IUser, data: Partial<IBook>) {
        return this.bookRepository.update({ id, user }, data);
    }

    public createAndSave(book: Partial<IBook>) {
        const newBook = this.create(book);
        return this.bookRepository.save(newBook);
    }

    public delete(id: number, user: IUser) {
        return this.bookRepository.delete({ id, user });
    }

    public create(book: Partial<IBook>) {
        return this.bookRepository.create(book);
    }
}
