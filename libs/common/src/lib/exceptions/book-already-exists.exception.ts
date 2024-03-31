import { ConflictException, HttpStatus } from '@nestjs/common';

export class BookAlreadyExistsException extends ConflictException {
    public constructor() {
        super(`The book with that name already exists! ${HttpStatus.CONFLICT}`);
    }
}
