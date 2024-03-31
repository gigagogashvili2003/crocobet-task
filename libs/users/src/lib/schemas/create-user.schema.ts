import { passwordRegex } from '@app/common';
import * as Joi from 'joi';
import { CreateUserDto } from '../dtos';

export const CreateUserSchema = Joi.object<CreateUserDto>({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
});
