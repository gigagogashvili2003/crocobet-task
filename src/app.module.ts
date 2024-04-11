import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@app/redis';
import { envSchema } from '@app/common/lib/schema';
import { DbModule } from '@app/db';
import { CommonModule, ThrottleLimit, ThrottlerTTL } from '@app/common';
import { UtilsModule } from '@app/utils';
import { SessionsModule } from '@app/sessions';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '@app/notifications';
import { CollectionsModule } from './collections/collections.module';
import { BooksModule } from './books/books.module';
import { CollectionBooksModule } from './collection-books/collection-books.module';
import { TerminusModule } from '@nestjs/terminus';
import { ChatModule } from '@app/chat';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema }),
        ThrottlerModule.forRoot([{ ttl: ThrottlerTTL.LONG, limit: ThrottleLimit.MEDIUM }]),
        JwtModule.register({
            global: true,
        }),
        TerminusModule,
        RedisModule,
        DbModule,
        CommonModule,
        UtilsModule,
        SessionsModule,
        AuthModule,
        UsersModule,
        NotificationsModule,
        CollectionsModule,
        BooksModule,
        CollectionBooksModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
