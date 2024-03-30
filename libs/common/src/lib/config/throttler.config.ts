import { ThrottleLimit, ThrottlerName, ThrottlerTTL } from '../enums'
import { ThrottlerMethodOrControllerOptions } from '../interfaces'

export const ThrottlerConfig: Record<ThrottlerName, Record<'default', ThrottlerMethodOrControllerOptions>> = {
    [ThrottlerName.SHORT]: { default: { ttl: ThrottlerTTL.SHORT, limit: ThrottleLimit.SHORT } },
    [ThrottlerName.MEDIUM]: { default: { ttl: ThrottlerTTL.MEDIUM, limit: ThrottleLimit.MEDIUM } },
    [ThrottlerName.LONG]: { default: { ttl: ThrottlerTTL.LONG, limit: ThrottleLimit.LONG } },
}
