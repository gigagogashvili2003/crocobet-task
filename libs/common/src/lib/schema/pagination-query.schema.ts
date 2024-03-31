import * as Joi from 'joi';
import { PaginationQueryDto } from '../interfaces';

export const PaginationQuerySchema = Joi.object<PaginationQueryDto>({
    page: Joi.number().min(1).default(1),
    pageSize: Joi.number().min(10).max(100).default(10),
});
