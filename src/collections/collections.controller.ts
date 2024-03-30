import { COLLECTION_SERVICE } from '@app/collections/lib/constants';
import {
    CollectionIdDto,
    CreateCollectionDto,
    DeleteCollectionParamDto,
    UpdateCollectionDto,
    UpdateCollectionParamDto,
} from '@app/collections/lib/dtos';
import { CreateCollectionSchema, UpdateCollectionSchema } from '@app/collections/lib/schemas';
import { CollectionIdSchema } from '@app/collections/lib/schemas/collection-id.schema';
import { CollectionService } from '@app/collections/lib/services';
import { AccessTokenGuard } from '@app/common';
import { CurrentUser } from '@app/common/lib/decorators';
import { JoiValidationPipe } from '@app/common/lib/pipes';
import { IUser } from '@app/users/lib/interfaces';
import { Body, Controller, Delete, Inject, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';

@Controller('collections')
export class CollectionsController {
    public constructor(@Inject(COLLECTION_SERVICE) private readonly collectionService: CollectionService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    public create(
        @Body(new JoiValidationPipe(CreateCollectionSchema)) createCollectionDto: CreateCollectionDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionService.createCollection(createCollectionDto, currentUser);
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    public delete(
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: DeleteCollectionParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionService.deleteCollection(params.id, currentUser);
    }

    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    public update(
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: UpdateCollectionParamDto,
        @Body(new JoiValidationPipe(UpdateCollectionSchema)) updateCollectionDto: UpdateCollectionDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionService.updateCollection(params.id, updateCollectionDto, currentUser);
    }
}
