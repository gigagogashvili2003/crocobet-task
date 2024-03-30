import {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { HasId, IBaseRepository, PaginationProps } from '../interfaces';
import { TCriteria } from '../types';

export abstract class BaseAbstractRepository<T extends HasId> implements IBaseRepository<T> {
    private entity: Repository<T>;

    public constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public create(data: DeepPartial<T>): T {
        return this.entity.create(data);
    }
    public createMany(data: DeepPartial<T>[]): Array<T> {
        return this.entity.create(data);
    }

    public save(data: DeepPartial<T>): Promise<T> {
        return this.entity.save(data);
    }

    public saveMany(data: DeepPartial<T>[]): Promise<Array<T>> {
        return this.entity.save(data);
    }

    public findOneById(id: any): Promise<T> {
        const options: FindOptionsWhere<T> = {
            id: id,
        };
        return this.entity.findOneBy(options);
    }

    public findOneByCondition(condition: FindOneOptions<T>): Promise<T> {
        return this.entity.findOne(condition);
    }

    public findAll(condition?: FindManyOptions<T>): Promise<T[]> {
        return this.entity.find(condition);
    }

    public findAllAndCount(condition?: FindManyOptions<T>, pagination?: PaginationProps): Promise<[T[], number]> {
        return this.entity.findAndCount({ ...condition, ...pagination });
    }

    public findWithRelations(condition: FindManyOptions<T>): Promise<T[]> {
        return this.entity.find(condition);
    }

    public preload(entityLike: DeepPartial<T>): Promise<T> {
        return this.entity.preload(entityLike);
    }

    public remove(data: T): Promise<T> {
        return this.entity.remove(data);
    }

    public async delete(criteria: TCriteria<T>): Promise<boolean> {
        const itemToDelete = await this.entity.delete(criteria);
        return !!itemToDelete.affected;
    }

    public async updateById(id: number, data: QueryDeepPartialEntity<T>) {
        await this.entity.update(id, data);
        return this.findOneById(id);
    }

    public async update(criteria: TCriteria<T>, data: QueryDeepPartialEntity<T>) {
        return await this.entity.update(criteria, data);
    }

    public count(options?: FindManyOptions<T>) {
        return this.entity.count(options);
    }

    public getQueryBuilder(alias?: string): SelectQueryBuilder<T> {
        return this.entity.createQueryBuilder(alias);
    }

    public findBy(options?: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
        return this.entity.findBy(options);
    }
}
