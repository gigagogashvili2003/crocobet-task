import { HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class TransactionFailException extends InternalServerErrorException {
    public constructor() {
        super(`Transaction failed! ${HttpStatus.INTERNAL_SERVER_ERROR}`);
    }
}
