import * as Joi from 'joi';

export const PageIdSchema = Joi.object({
    pageId: Joi.number().required(),
});
