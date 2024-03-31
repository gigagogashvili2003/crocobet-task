import * as Joi from 'joi';
import { UpdateBookDto } from '../dtos';

export const UpdateBookSchema = Joi.object<UpdateBookDto>({
    name: Joi.string().min(1).max(100),
    author: Joi.string().min(1).max(100),
});
