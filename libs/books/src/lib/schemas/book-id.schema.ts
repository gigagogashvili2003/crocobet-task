import * as Joi from 'joi';
import { BookIdDto } from '../dtos';

export const BookIdSchema = Joi.object<BookIdDto>({
    id: Joi.number().required(),
});
