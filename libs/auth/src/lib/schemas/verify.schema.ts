import * as Joi from 'joi';
import { VerifyDto } from '../dtos';
export const VerifySchema = Joi.object<VerifyDto>({
    code: Joi.number().min(100000).max(999999).required(),
});
