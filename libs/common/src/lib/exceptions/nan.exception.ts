import { BadRequestException, HttpStatus } from '@nestjs/common';

export class NaNException extends BadRequestException {
    public constructor() {
        super(`It's unable convert provided string to number! ${HttpStatus.BAD_REQUEST}`);
    }
}
