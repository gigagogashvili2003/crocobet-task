import * as Joi from 'joi';
import { SignInDto } from '../dtos';

export const SignInSchema = Joi.object<SignInDto>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
