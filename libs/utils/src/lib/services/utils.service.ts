import { NaNException } from '@app/common/lib/exceptions';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    public convertStrTonumber(str: string) {
        const transformed = parseInt(str);
        if (isNaN(transformed)) {
            throw new NaNException();
        }
        return transformed;
    }
}
