import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { COLLECTION_REPOSITORY } from '../constants';
import { ICollection, ICollectionRepository } from '../interfaces';
import { CreateCollectionDto, UpdateCollectionDto } from '../dtos';
import { IUser } from '@app/users/lib/interfaces';
import { CollectionAlreadyExistsException, CollectionNotFoundException } from '@app/common/lib/exceptions';
import { PromiseGenericResponse } from '@app/common/lib/types';
import { UTILS_SERVICE, UtilsService } from '@app/utils';
import { CollectionDetailsResponseEntity, CollectionResponseEntity } from '../response-entities';

@Injectable()
export class CollectionService {
    public constructor(
        @Inject(COLLECTION_REPOSITORY) private readonly collectionRepository: ICollectionRepository,
        @Inject(UTILS_SERVICE) private readonly utilsService: UtilsService,
    ) {}

    public async createCollection(
        createCollectionDto: CreateCollectionDto,
        currentUser: IUser,
    ): PromiseGenericResponse<null> {
        const { name } = createCollectionDto;

        console.log(currentUser);
        const collectionExists = await this.findOneByName(name, currentUser);

        if (collectionExists) {
            throw new CollectionAlreadyExistsException();
        }

        await this.createAndSave({ name, user: currentUser });

        return { status: HttpStatus.OK, message: 'New collection has created!' };
    }

    public async deleteCollection(id: string, currentUser: IUser) {
        const numericId = this.utilsService.convertStrTonumber(id);

        const hasDeleted = await this.deleteByUser(numericId, currentUser);

        if (!hasDeleted) {
            throw new CollectionNotFoundException();
        }
    }

    public async updateCollection(
        id: string,
        updateCollectionDto: UpdateCollectionDto,
        currentUser: IUser,
    ): PromiseGenericResponse<null> {
        const numericId = this.utilsService.convertStrTonumber(id);

        const collection = await this.findOneById(numericId, currentUser);

        if (!collection) {
            throw new CollectionNotFoundException();
        }

        await this.update(collection.id, currentUser, { ...updateCollectionDto });

        return { status: HttpStatus.OK, message: 'Collection has updated!' };
    }

    public async findAllCollection(currentUser: IUser): PromiseGenericResponse<{ collections: Array<ICollection> }> {
        const collections = await this.findAll(currentUser);

        const serializedCollections = this.serializeCollections(collections);

        return { status: HttpStatus.OK, body: { collections: serializedCollections } };
    }

    public async findCollectionDetails(
        id: string,
        currentUser: IUser,
    ): PromiseGenericResponse<{ collection: ICollection }> {
        const numericId = this.utilsService.convertStrTonumber(id);

        const collection = await this.findOneByIdWithRelations(numericId, currentUser);

        if (!collection) {
            throw new CollectionNotFoundException();
        }

        const serializedCollection = this.serializeCollectionDetails(collection);

        return { status: HttpStatus.OK, body: { collection: serializedCollection } };
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

    public findAll(user: IUser) {
        return this.collectionRepository.findAll({ where: { user } });
    }
}
