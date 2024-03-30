import { HttpStatus, NotFoundException } from '@nestjs/common';

export class CollectionNotFoundException extends NotFoundException {
    public constructor() {
        super(`Collection not found! ${HttpStatus.NOT_FOUND}`);
    }
}
