import { Inject, Injectable } from '@nestjs/common';
import { BOOK_PAGE_REPOSITORY } from '../constants';
import { IBookPageRepository } from '../interfaces';
import { IBookPage } from '../interfaces/book-page.interface';

@Injectable()
export class BookPageService {
    public constructor(@Inject(BOOK_PAGE_REPOSITORY) private readonly bookPageRepository: IBookPageRepository) {}

    public preloadBookPages(pages: Array<{ content: string }>) {
        return pages.map((page) => this.create({ content: page.content }));
    }

    public create(bookPage: Partial<IBookPage>) {
        return this.bookPageRepository.create(bookPage);
    }
}
