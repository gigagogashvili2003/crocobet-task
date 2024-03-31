import { Module } from '@nestjs/common';
import { authProviders } from './lib/providers';
import { UsersLibModule } from '@app/users';
import { UtilsModule } from '@app/utils';
import { SessionsModule } from '@app/sessions';
import { NotificationsModule } from '@app/notifications';
import { RedisModule } from '@app/redis';

@Module({
    imports: [UsersLibModule, UtilsModule, SessionsModule, NotificationsModule, RedisModule],
    providers: [...authProviders],
    exports: [...authProviders],
})
export class AuthLibModule {}
