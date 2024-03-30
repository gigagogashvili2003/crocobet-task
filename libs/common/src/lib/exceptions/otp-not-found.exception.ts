import { HttpStatus, NotFoundException } from '@nestjs/common';

export class OtpNotFoundException extends NotFoundException {
    public constructor() {
        super(`Otp not found. maybe it's already expired! ${HttpStatus.NOT_FOUND}`);
    }
}
