import * as Joi from 'joi';
import { AddBookToCollectionDto } from '../dtos/add-book-to-collection.dto';

export const AddBookToCollectionSchema = Joi.object<AddBookToCollectionDto>({
    bookId: Joi.number().required(),
});
