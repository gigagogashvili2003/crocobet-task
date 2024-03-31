import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../constants';
import { IBook, IBookRepository } from '../interfaces';
import { CreateBookDto } from '../dtos';
import { IUser } from '@app/users/lib/interfaces';
import { BookAlreadyExistsException, BookNotFoundException } from '@app/common/lib/exceptions';
import { BOOK_PAGE_SERVICE } from '@app/book-pages/lib/constants';
import { BookPageService } from '@app/book-pages/lib/services';
import { IBookPage } from '@app/book-pages/lib/interfaces/book-page.interface';
import { PromiseGenericResponse } from '@app/common/lib/types';
import { PaginationService, UTILS_SERVICE, UtilsService } from '@app/utils';
import { BookResponseEntity } from '../response-entities';
import { IPageInfo, PaginationProps, PaginationQueryDto } from '@app/common';
import { BookDetailsResponseEntity } from '../response-entities/book-details-response.entity';

@Injectable()
export class BookService extends PaginationService<IBook> {
    public constructor(
        @Inject(BOOK_REPOSITORY) private readonly bookRepository: IBookRepository,
        @Inject(BOOK_PAGE_SERVICE) private readonly bookPageService: BookPageService,
        @Inject(UTILS_SERVICE) private readonly utilsService: UtilsService,
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

    public async findAllBook(
        user: IUser,
        paginationQueryDto: PaginationQueryDto,
    ): PromiseGenericResponse<{ books: Array<IBook>; pageInfo: IPageInfo }> {
        const { skip, take } = this.getPaginationProps(paginationQueryDto);

        const [books, booksCount] = await this.findAllAndCount(user, { skip, take });

        const { items, pageInfo } = this.paginate(
            { items: books, totalCount: booksCount },
            { page: skip, currentPage: paginationQueryDto.page, pageSize: take },
        );

        const serializedBooks = this.serialize(items);

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

        const serializedPage = this.bookPageService.serialize(page);

        // await this.update(book.id, currentUser, { lastReadPage: page });

        return { status: HttpStatus.OK, body: { page: serializedPage } };
    }

    public async changeLastReadPage(bookId: number, pageId: number, currentUser: IUser): PromiseGenericResponse<null> {
        const book = await this.checkIfBookExists(bookId, currentUser, true);

        const newPage = await this.bookPageService.checkIfPageExists(pageId, book);

        // await this.update(book.id, currentUser, { lastReadPage: newPage });

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
            relations: { lastReadPage: true },
            ...pagination,
        });
    }

    public findOneByName(name: string, user: IUser) {
        return this.bookRepository.findOneByCondition({ where: { name, user } });
    }

    public findOneWithRelations(id: number, user: IUser) {
        return this.bookRepository.findOneByCondition({
            where: { id, user },
            relations: { lastReadPage: true, pages: true, collectionBooks: true, user: true },
        });
    }

    public update(id: number, user: IUser, data: Partial<IBook>) {
        return this.bookRepository.update({ id, user }, {});
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
