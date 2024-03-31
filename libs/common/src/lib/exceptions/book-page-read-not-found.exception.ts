import { HttpStatus, NotFoundException } from '@nestjs/common';

export class BookPageReadNotFoundException extends NotFoundException {
    public constructor() {
        super(`You haven't read any page from that book yet! ${HttpStatus.NOT_FOUND}`);
    }
}
