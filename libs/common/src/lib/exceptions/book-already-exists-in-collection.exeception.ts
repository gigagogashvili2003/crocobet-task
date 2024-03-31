import { ConflictException, HttpStatus } from '@nestjs/common';

export class BookAlreadyExistsInCollectionException extends ConflictException {
    public constructor() {
        super(`The book already exists in that collection! ${HttpStatus.CONFLICT}`);
    }
}
