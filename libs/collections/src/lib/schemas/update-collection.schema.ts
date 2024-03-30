import * as Joi from 'joi';

export const UpdateCollectionSchema = Joi.object({
    name: Joi.string().min(1).max(20),
});
