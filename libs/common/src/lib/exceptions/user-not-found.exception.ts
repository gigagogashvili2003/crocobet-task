import { HttpStatus, NotFoundException } from '@nestjs/common'

export class UserNotFoundException extends NotFoundException {
    public constructor() {
        super(`User not found! ${HttpStatus.NOT_FOUND}`)
    }
}
