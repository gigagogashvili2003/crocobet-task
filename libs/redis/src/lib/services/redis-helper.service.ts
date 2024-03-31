import { Injectable } from '@nestjs/common';
import { KeyType } from '../enums';

@Injectable()
export class RedisHelperService {
    public generateVerificationKey(email: string) {
        return `${KeyType.EMAIL_VERIFICATION}_${email}`;
    }

    public generateBookCacheKey(userId: number) {
        return `${KeyType.CACHE}_books_user_${userId}`;
    }

    public geenrateBookDetailsCache(bookId: number, userId: number) {
        return `${KeyType.CACHE}_books_${bookId}_user_${userId}`;
    }
    public generateCollectionsCache(userId: number) {
        return `${KeyType.CACHE}_collections_user_${userId}`;
    }
}
