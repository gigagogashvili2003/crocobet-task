import * as Joi from 'joi';
import { DeleteBookFromCollectionDto } from '../dtos';

export const DeleteBookFromCollectionSchema = Joi.object<DeleteBookFromCollectionDto>({
    bookId: Joi.number().required(),
});
