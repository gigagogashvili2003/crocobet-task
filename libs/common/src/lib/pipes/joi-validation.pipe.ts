import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: Joi.ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const extendedSchema = this.schema.options({ presence: 'optional', convert: true });

        const { error, value: validatedValue } = extendedSchema.validate(value);

        console.log(error);

        if (error) {
            throw new BadRequestException('Validation failed', error.message);
        }

        return validatedValue;
    }
}
