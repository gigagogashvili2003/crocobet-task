import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { COLLECTION_REPOSITORY } from '../constants';
import { ICollection, ICollectionRepository } from '../interfaces';
import { CreateCollectionDto, UpdateCollectionDto } from '../dtos';
import { IUser } from '@app/users/lib/interfaces';
import { CollectionAlreadyExistsException, CollectionNotFoundException } from '@app/common/lib/exceptions';
import { PromiseGenericResponse } from '@app/common/lib/types';
import { CollectionDetailsResponseEntity, CollectionResponseEntity } from '../response-entities';
import { REDIS_HELPER_SERVICE, REDIS_SERVICE } from '@app/redis/lib/constants';
import { RedisHelperService, RedisService } from '@app/redis';
import { PaginationService } from '@app/utils';
import { PaginationQueryDto } from '@app/common';
import { FindAllCollections } from '../types';
import { RedisTTL } from '@app/redis/lib/enums';

@Injectable()
export class CollectionService extends PaginationService<ICollection> {
    public constructor(
        @Inject(COLLECTION_REPOSITORY) private readonly collectionRepository: ICollectionRepository,
        @Inject(REDIS_SERVICE) private readonly redisService: RedisService,
        @Inject(REDIS_HELPER_SERVICE) private readonly redisHelperService: RedisHelperService,
    ) {
        super();
    }

    public async createCollection(
        createCollectionDto: CreateCollectionDto,
        currentUser: IUser,
    ): PromiseGenericResponse<null> {
        const { name } = createCollectionDto;

        const collectionExists = await this.findOneByName(name, currentUser);

        if (collectionExists) {
            throw new CollectionAlreadyExistsException();
        }

        await this.createAndSave({ name, user: currentUser });

        return { status: HttpStatus.OK, message: 'New collection has created!' };
    }

    public async deleteCollection(id: number, currentUser: IUser): PromiseGenericResponse<null> {
        const hasDeleted = await this.deleteByUser(id, currentUser);

        if (!hasDeleted) {
            throw new CollectionNotFoundException();
        }

        return { status: HttpStatus.OK, message: 'Collection has deleted' };
    }

    public async updateCollection(
        id: number,
        updateCollectionDto: UpdateCollectionDto,
        currentUser: IUser,
    ): PromiseGenericResponse<null> {
        const collection = await this.checkIfCollectionExists(id, currentUser);

        await this.update(collection.id, currentUser, { ...updateCollectionDto });

        return { status: HttpStatus.OK, message: 'Collection has updated!' };
    }

    public async findAllCollection(
        currentUser: IUser,
        paginatonQueryDto: PaginationQueryDto,
    ): PromiseGenericResponse<FindAllCollections> {
        const { skip, take } = this.getPaginationProps(paginatonQueryDto);

        const cacheKey = this.redisHelperService.generateCollectionsCache(currentUser.id);
        const cacheExists = await this.redisService.get(cacheKey);

        if (cacheExists) {
            const parsedData: FindAllCollections = JSON.parse(cacheExists);
            return { status: HttpStatus.OK, body: { ...parsedData } };
        }

        const [collections, collectionsCount] = await this.findAllAndCount(currentUser);

        const { items, pageInfo } = this.paginate(
            { items: collections, totalCount: collectionsCount },
            { page: skip, currentPage: paginatonQueryDto.page, pageSize: take },
        );

        const serializedCollections = this.serializeCollections(items);

        await this.redisService.set(
            cacheKey,
            JSON.stringify({ collections: serializedCollections, pageInfo }),
            RedisTTL.ONE_MINUTE,
        );

        return { status: HttpStatus.OK, body: { collections: serializedCollections, pageInfo } };
    }

    public async findCollectionDetails(
        id: number,
        currentUser: IUser,
    ): PromiseGenericResponse<{ collection: ICollection }> {
        const collection = await this.checkIfCollectionExists(id, currentUser, true);

        const serializedCollection = this.serializeCollectionDetails(collection);

        return { status: HttpStatus.OK, body: { collection: serializedCollection } };
    }

    public async checkIfCollectionExists(id: number, currentUser: IUser, withRelations?: boolean) {
        let collection: ICollection = null;
        if (!withRelations) {
            collection = await this.findOneById(id, currentUser);
        } else {
            collection = await this.findOneByIdWithRelations(id, currentUser);
        }

        if (!collection) {
            throw new CollectionNotFoundException();
        }

        return collection;
    }

    public serializeCollectionDetails(collection: ICollection) {
        return new CollectionDetailsResponseEntity(collection);
    }

    public serializeCollections(collections: Array<ICollection>) {
        return collections.map((collection) => new CollectionResponseEntity(collection));
    }

    public deleteByUser(id: number, user: IUser) {
        return this.collectionRepository.delete({ id, user });
    }

    public findOneByName(name: string, user: IUser) {
        return this.collectionRepository.findOneByCondition({ where: { name, user } });
    }

    public findOneById(id: number, user: IUser) {
        return this.collectionRepository.findOneByCondition({ where: { id, user } });
    }

    public findOneByIdWithRelations(id: number, user: IUser) {
        return this.collectionRepository.findOneByCondition({ where: { id, user }, relations: { user: true } });
    }

    public createAndSave(collection: Partial<ICollection>) {
        const newCollection = this.collectionRepository.create(collection);
        return this.collectionRepository.save(newCollection);
    }

    public update(id: number, user: IUser, collection: Partial<ICollection>) {
        return this.collectionRepository.update({ id, user }, collection);
    }

    public findAllAndCount(user: IUser) {
        return this.collectionRepository.findAllAndCount({ where: { user } });
    }
}
