import { Inject, Injectable } from '@nestjs/common';
import { BOOK_PAGE_REPOSITORY } from '../constants';
import { IBookPageRepository } from '../interfaces';
import { IBookPage } from '../interfaces/book-page.interface';
import { IBook } from '@app/books/lib/interfaces';
import { BookPageNotFoundException } from '@app/common/lib/exceptions';
import { BookPageResponseEntity } from '../response-entity';

@Injectable()
export class BookPageService {
    public constructor(@Inject(BOOK_PAGE_REPOSITORY) private readonly bookPageRepository: IBookPageRepository) {}

    public serialize(bookPage: IBookPage) {
        return new BookPageResponseEntity(bookPage);
    }

    public async checkIfPageExists(id: number, book: IBook) {
        const bookPage = await this.bookPageRepository.findOneByCondition({ where: { id, book: { id: book.id } } });

        if (!bookPage) {
            throw new BookPageNotFoundException();
        }

        return bookPage;
    }

    public preloadBookPages(pages: Array<{ content: string }>) {
        return pages.map((page) => this.create({ content: page.content }));
    }

    public create(bookPage: Partial<IBookPage>) {
        return this.bookPageRepository.create(bookPage);
    }
}
