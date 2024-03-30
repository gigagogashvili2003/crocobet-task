import * as Joi from 'joi';
import { CollectionIdDto } from '../dtos';

export const CollectionIdSchema = Joi.object<CollectionIdDto>({
    id: Joi.number().required(),
});
