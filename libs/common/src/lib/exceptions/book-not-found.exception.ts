import { HttpStatus, NotFoundException } from '@nestjs/common';

export class BookNotFoundException extends NotFoundException {
    public constructor() {
        super(`Book not found! ${HttpStatus.NOT_FOUND}`);
    }
}
