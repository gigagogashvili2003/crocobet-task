import { Injectable } from '@nestjs/common';
import { KeyType } from '../enums';

@Injectable()
export class RedisHelperService {
    public generateVerificationKey(email: string) {
        return `${KeyType.EMAIL_VERIFICATION}_${email}`;
    }
}
