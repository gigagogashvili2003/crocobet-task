import { Provider } from '@nestjs/common';
import { AUTH_SERVICE } from '../constants';
import { AuthService } from '../services';
import { AccessTokenStrategy, LocalStrategy, RefreshTokenStrategy } from '../strategies';

export const authProviders: Array<Provider> = [
    { provide: AUTH_SERVICE, useClass: AuthService },
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
];
