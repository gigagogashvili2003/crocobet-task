import * as Joi from 'joi';

export const CreateCollectionSchema = Joi.object({
    name: Joi.string().min(1).max(20).required(),
});
