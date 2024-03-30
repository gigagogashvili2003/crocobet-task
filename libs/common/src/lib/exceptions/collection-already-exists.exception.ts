import { ConflictException, HttpStatus } from '@nestjs/common';

export class CollectionAlreadyExistsException extends ConflictException {
    public constructor() {
        super(`The collection with that name already exists! ${HttpStatus.CONFLICT}`);
    }
}
