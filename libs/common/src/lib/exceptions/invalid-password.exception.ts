import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';

export class InvalidPasswordException extends BadRequestException {
    public constructor() {
        super(`Invalid password! ${HttpStatus.BAD_REQUEST}`);
    }
}
