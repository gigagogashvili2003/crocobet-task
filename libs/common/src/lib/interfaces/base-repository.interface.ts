import {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    SelectQueryBuilder,
    UpdateResult,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { TCriteria } from '../types'
import { PaginationProps } from './pagination-props.interface'

export interface BaseRepositoryInterface<T> {
    create(data: DeepPartial<T>): T
    createMany(data: Array<DeepPartial<T>>): Array<T>
    save(data: DeepPartial<T>): Promise<T>
    saveMany(data: Array<DeepPartial<T>>): Promise<Array<T>>
    updateById(id: number, data: QueryDeepPartialEntity<T>): Promise<T>
    update(criteria: TCriteria<T>, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>
    findOneById(id: number): Promise<T>
    findOneByCondition(condition: FindOneOptions<T>): Promise<T>
    findBy(options?: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>
    findAll(condition?: FindManyOptions<T>): Promise<Array<T>>
    findAllAndCount(condition?: FindManyOptions<T>, pagination?: PaginationProps): Promise<[T[], number]>
    findWithRelations(condition: FindManyOptions<T>): Promise<Array<T>>
    preload(entityLike: DeepPartial<T>): Promise<T>
    remove(data: T): Promise<T>
    delete(criteria: TCriteria<T>): Promise<boolean>
    count(options?: FindManyOptions<T>): Promise<number>
    getQueryBuilder(alias?: string): SelectQueryBuilder<T>
}
