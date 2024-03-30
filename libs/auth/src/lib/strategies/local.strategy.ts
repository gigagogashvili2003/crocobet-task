import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';
import { CRYPTO_SERVICE } from '@app/utils/lib/constants';
import { CryptoService } from '@app/utils';
import { AuthService } from '../services';
import { InvalidPasswordException, UserNotFoundException } from '@app/common/lib/exceptions';
import { AUTH_SERVICE } from '../constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    public constructor(
        @Inject(AUTH_SERVICE) private readonly authService: AuthService,
        @Inject(CRYPTO_SERVICE) private readonly cryptoService: CryptoService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    public async validate(email: string, password: string) {
        const user = await this.authService.validate(email);
        if (!user) throw new UserNotFoundException();

        const passwordsMatch = await this.cryptoService.comparePassword(password, user.password);

        if (!passwordsMatch) {
            throw new InvalidPasswordException();
        }

        return user;
    }
}
