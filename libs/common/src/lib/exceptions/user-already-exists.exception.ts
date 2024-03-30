import { ConflictException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
    public constructor() {
        super(`User already exists! ${HttpStatus.CONFLICT}`);
    }
}
