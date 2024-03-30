import * as Joi from 'joi';
export const VerifySchema = Joi.object({
    otp: Joi.number().min(100000).max(999999).required(),
});
