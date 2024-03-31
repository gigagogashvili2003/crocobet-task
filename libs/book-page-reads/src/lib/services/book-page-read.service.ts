import { Inject, Injectable } from '@nestjs/common';
import { BOOK_PAGE_READ_REPOSITORY } from '../constants/idnex';
import { IBookPageRead, IBookPageReadRepository } from '../interfaces';
import { IUser } from '@app/users/lib/interfaces';
import { IBook } from '@app/books/lib/interfaces';

@Injectable()
export class BookPageReadService {
    public constructor(
        @Inject(BOOK_PAGE_READ_REPOSITORY) private readonly bookPageReadRepository: IBookPageReadRepository,
    ) {}

    public update(user: IUser, book: IBook, data: Partial<IBookPageRead>) {
        return this.bookPageReadRepository.update({ user, book }, data);
    }

    public findOne(user: IUser, book: IBook) {
        return this.bookPageReadRepository.findOneByCondition({ where: { user, book } });
    }

    public createAndSave(data: Partial<IBookPageRead>) {
        const newBookPageRead = this.bookPageReadRepository.create(data);
        return this.bookPageReadRepository.save(newBookPageRead);
    }
}
