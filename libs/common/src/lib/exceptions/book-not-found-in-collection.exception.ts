import { HttpStatus, NotFoundException } from '@nestjs/common';

export class BookNotFoundInCollectionException extends NotFoundException {
    public constructor() {
        super(`Book not found in that collection! ${HttpStatus.NOT_FOUND}`);
    }
}
