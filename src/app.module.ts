import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@app/redis';
import { envSchema } from '@app/common/lib/schema';
import { DbModule } from '@app/db';
import { CommonModule, ThrottlerTTL } from '@app/common';
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

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema }),
        ThrottlerModule.forRoot([{ ttl: ThrottlerTTL.LONG, limit: ThrottlerTTL.MEDIUM }]),
        JwtModule.register({
            global: true,
        }),
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
    ],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
