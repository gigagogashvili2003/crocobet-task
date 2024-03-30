import { BadRequestException, HttpStatus } from '@nestjs/common';

export class InvalidOtpException extends BadRequestException {
    public constructor() {
        super(`Invalid Otp! ${HttpStatus.BAD_REQUEST}`);
    }
}
