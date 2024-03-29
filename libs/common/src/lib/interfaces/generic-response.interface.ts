import { HttpStatus } from '@nestjs/common'

export interface GenericResponse<B = null> {
    message: string
    status: HttpStatus
    body?: B
}
