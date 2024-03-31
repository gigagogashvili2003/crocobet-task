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
import { UTILS_SERVICE, UtilsService } from '@app/utils';

@Injectable()
export class BookService {
    public constructor(
        @Inject(BOOK_REPOSITORY) private readonly bookRepository: IBookRepository,
        @Inject(BOOK_PAGE_SERVICE) private readonly bookPageService: BookPageService,
        @Inject(UTILS_SERVICE) private readonly utilsService: UtilsService,
    ) {}

    public async createBook(createBookDto: CreateBookDto, currentUser: IUser): PromiseGenericResponse<null> {
        const { name, pages } = createBookDto;

        const bookExists = await this.findOneByName(name, currentUser);

        if (bookExists) {
            throw new BookAlreadyExistsException();
        }

        let bookPages: IBookPage[] = [];
        if (pages.length) {
            bookPages = this.bookPageService.preloadBookPages(pages);
        }

        await this.createAndSave({ user: currentUser, name, pages: bookPages });

        return { status: HttpStatus.CREATED, message: 'New book has created' };
    }

    public async deleteBook(id: string, user: IUser): PromiseGenericResponse<null> {
        const numericId = this.utilsService.convertStrTonumber(id);

        const hasDeleted = await this.delete(numericId, user);

        if (!hasDeleted) {
            throw new BookNotFoundException();
        }

        return { status: HttpStatus.OK, message: 'Book has deleted' };
    }

    public async checkIfBookExists(id: number, user: IUser) {
        const book = await this.findOneById(id, user);

        if (!book) {
            throw new BookNotFoundException();
        }

        return book;
    }

    public findOneById(id: number, user: IUser) {
        return this.bookRepository.findOneByCondition({ where: { id, user } });
    }

    public findOneByName(name: string, user: IUser) {
        return this.bookRepository.findOneByCondition({ where: { name, user } });
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
