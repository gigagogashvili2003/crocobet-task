import { HttpStatus, NotFoundException } from '@nestjs/common';

export class BookPageNotFoundException extends NotFoundException {
    public constructor() {
        super(`Book page not found! ${HttpStatus.NOT_FOUND}`);
    }
}
