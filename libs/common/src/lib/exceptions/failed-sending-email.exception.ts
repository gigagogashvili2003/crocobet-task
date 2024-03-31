import { HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class FailedSendingEmailException extends InternalServerErrorException {
    public constructor() {
        super(`Some error occured during sending an email! ${HttpStatus.INTERNAL_SERVER_ERROR}`);
    }
}
