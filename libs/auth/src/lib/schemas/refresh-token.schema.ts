import * as Joi from 'joi';
import { RefreshTokenDto } from '../dtos';

export const RefreshTokenSchema = Joi.object<RefreshTokenDto>({
    token: Joi.string().required(),
});
