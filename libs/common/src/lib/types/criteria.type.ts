import { FindOptionsWhere, ObjectId } from 'typeorm'

export type TCriteria<T> =
    | string
    | number
    | FindOptionsWhere<T>
    | Date
    | ObjectId
    | string[]
    | number[]
    | Date[]
    | ObjectId[]
