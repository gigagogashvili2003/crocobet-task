import { HttpStatus, NotFoundException } from '@nestjs/common';

export class SessionNotFoundException extends NotFoundException {
    public constructor() {
        super(`Session not found, You aren't logged in the system! ${HttpStatus.NOT_FOUND}`);
    }
}
