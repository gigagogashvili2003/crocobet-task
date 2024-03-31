import * as Joi from 'joi';
import { CreateBookPageDto } from '../dtos';

export const CreateBookPageSchema = Joi.object<CreateBookPageDto>({
    content: Joi.string().min(1).max(1000).required(),
});
