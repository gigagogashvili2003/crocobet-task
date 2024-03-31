import * as Joi from 'joi';
import { CreateBookDto } from '../dtos';

export const createBookSchema = Joi.object<CreateBookDto>({
    name: Joi.string().min(1).max(100).required(),
    author: Joi.string().min(1).max(100).required(),
    pages: Joi.array().items(
        Joi.object({
            content: Joi.string().min(1).max(1000).required(),
        }),
    ),
});
