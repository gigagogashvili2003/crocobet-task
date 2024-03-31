import { JwtPayloadInterface, Token } from '@app/common';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services';
import { IUser } from '@app/users/lib/interfaces';
import { SessionNotFoundException, UserNotFoundException } from '@app/common/lib/exceptions';
import { AUTH_SERVICE } from '../constants';
import { SESSION_SERVICE } from '@app/sessions/lib/constants';
import { SessionService } from '@app/sessions';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, Token.ACCESS_TOKEN) {
    constructor(
        private readonly configService: ConfigService,
        @Inject(AUTH_SERVICE) private readonly authService: AuthService,
        @Inject(SESSION_SERVICE) private readonly sessionService: SessionService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
        });
    }

    public async validate(payload: JwtPayloadInterface): Promise<IUser> {
        const user = await this.authService.validateById(payload.sub);

        if (!user) throw new UserNotFoundException();

        const session = await this.sessionService.findOneByUser(user.id);

        if (!session) {
            throw new SessionNotFoundException();
        }

        return user;
    }
}
