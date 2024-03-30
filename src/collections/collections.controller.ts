import { COLLECTION_SERVICE } from '@app/collections/lib/constants';
import {
    CollectionIdDto,
    CreateCollectionDto,
    DeleteCollectionParamDto,
    UpdateCollectionDto,
    UpdateCollectionParamDto,
} from '@app/collections/lib/dtos';
import { CollectionResponseEntity } from '@app/collections/lib/response-entities';
import { CreateCollectionSchema, UpdateCollectionSchema } from '@app/collections/lib/schemas';
import { CollectionIdSchema } from '@app/collections/lib/schemas/collection-id.schema';
import { CollectionService } from '@app/collections/lib/services';
import { AccessTokenGuard } from '@app/common';
import { CurrentUser } from '@app/common/lib/decorators';
import { JoiValidationPipe } from '@app/common/lib/pipes';
import { IUser } from '@app/users/lib/interfaces';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
    public constructor(@Inject(COLLECTION_SERVICE) private readonly collectionService: CollectionService) {}

    @ApiResponse({ description: 'Creates new collection for a user', status: HttpStatus.CREATED })
    @ApiResponse({ description: 'Collection already exists!', status: HttpStatus.CONFLICT })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseGuards(AccessTokenGuard)
    public create(
        @Body(new JoiValidationPipe(CreateCollectionSchema)) createCollectionDto: CreateCollectionDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionService.createCollection(createCollectionDto, currentUser);
    }

    @ApiResponse({ description: 'Collection not found', status: HttpStatus.NOT_FOUND })
    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    public delete(
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: DeleteCollectionParamDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionService.deleteCollection(params.id, currentUser);
    }

    @ApiResponse({ description: 'Collection not found', status: HttpStatus.NOT_FOUND })
    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    public update(
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: UpdateCollectionParamDto,
        @Body(new JoiValidationPipe(UpdateCollectionSchema)) updateCollectionDto: UpdateCollectionDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionService.updateCollection(params.id, updateCollectionDto, currentUser);
    }

    @ApiResponse({
        description: 'Returns all collection from a specific user',
        status: HttpStatus.OK,
        type: [CollectionResponseEntity],
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(AccessTokenGuard)
    public findAllCollection(@CurrentUser() currentUser: IUser) {
        return this.collectionService.findAllCollection(currentUser);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    @UseGuards(AccessTokenGuard)
    public findCollectionDetails(
        @Param(new JoiValidationPipe(CollectionIdSchema)) params: CollectionIdDto,
        @CurrentUser() currentUser: IUser,
    ) {
        return this.collectionService.findCollectionDetails(params.id, currentUser);
    }
}
