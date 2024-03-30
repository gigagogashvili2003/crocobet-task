import { Module } from '@nestjs/common';
import { authProviders } from './lib/providers';
import { UsersLibModule } from '@app/users';
import { UtilsModule } from '@app/utils';
import { SessionsModule } from '@app/sessions';

@Module({
    imports: [UsersLibModule, UtilsModule, SessionsModule],
    providers: [...authProviders],
    exports: [...authProviders],
})
export class AuthLibModule {}
