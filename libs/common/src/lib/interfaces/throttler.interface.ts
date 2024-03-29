import { Resolvable } from '@nestjs/throttler'

export interface ThrottlerMethodOrControllerOptions {
    limit?: Resolvable<number>
    ttl?: Resolvable<number>
}
