import { GenericResponse, JwtPayloadInterface, Token } from '@app/common';
import {
    InvalidOtpException,
    OtpNotFoundException,
    SessionNotFoundException,
    UserAlreadyExistsException,
} from '@app/common/lib/exceptions';
import { PromiseGenericResponse } from '@app/common/lib/types';
import { SessionService } from '@app/sessions';
import { SESSION_SERVICE } from '@app/sessions/lib/constants';
import { UsersService } from '@app/users';
import { USER_SERVICE } from '@app/users/lib/constants';
import { CreateUserDto } from '@app/users/lib/dtos';
import { IUser } from '@app/users/lib/interfaces';
import { CRYPTO_SERVICE, CryptoService, JWT_SERVICE, JwtLibService } from '@app/utils';
import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITokens } from '../interfaces';
import { MAIL_SENDER_SERVICE } from '@app/notifications/lib/constants';
import { MailSenderService } from '@app/notifications/lib/services';
import { REDIS_HELPER_SERVICE, REDIS_SERVICE } from '@app/redis/lib/constants';
import { RedisHelperService, RedisService } from '@app/redis';
import { RedisTTL } from '@app/redis/lib/enums';

@Injectable()
export class AuthService {
    public constructor(
        @Inject(USER_SERVICE) private readonly userService: UsersService,
        @Inject(CRYPTO_SERVICE) private readonly cryptoService: CryptoService,
        @Inject(JWT_SERVICE) private readonly jwtService: JwtLibService,
        @Inject(SESSION_SERVICE) private readonly sessionService: SessionService,
        @Inject(MAIL_SENDER_SERVICE) private readonly mailSenderService: MailSenderService,
        @Inject(REDIS_SERVICE) private readonly redisService: RedisService,
        @Inject(REDIS_HELPER_SERVICE) private readonly redisHelperService: RedisHelperService,
    ) {}

    public async signup(createUserDto: CreateUserDto): PromiseGenericResponse<null> {
        const { email, password } = createUserDto;

        const userExists = await this.userService.findOneByEmail(email);

        if (userExists) {
            throw new UserAlreadyExistsException();
        }

        const hashedPassword = await this.cryptoService.hashPassword(password);

        await this.userService.createAndSave({ ...createUserDto, password: hashedPassword });

        return { status: HttpStatus.CREATED };
    }

    public async signin(currentUser: IUser): PromiseGenericResponse<{ tokens: ITokens }> {
        const { id, email } = currentUser;

        const [accessToken, refreshToken] = await this.signTokens({ email, sub: id });

        const sessionExists = await this.sessionService.findOneByUser(id);

        if (!sessionExists) {
            await this.sessionService.createAndSave({ refreshToken, user: currentUser });
        } else {
            await this.sessionService.updateByUser(id, { refreshToken });
        }

        return { status: HttpStatus.OK, body: { tokens: { accessToken, refreshToken } } };
    }

    public async signout(currentUser: IUser): PromiseGenericResponse<null> {
        const hasSessionDeleted = await this.sessionService.deleteByUser(currentUser.id);

        if (!hasSessionDeleted) {
            throw new SessionNotFoundException();
        }

        return { status: HttpStatus.OK };
    }

    public async refreshToken(currentUser: IUser): PromiseGenericResponse<{ tokens: ITokens }> {
        const { id, email } = currentUser;

        const [accessToken, refreshToken] = await this.signTokens({ sub: id, email });

        await this.sessionService.updateByUser(id, { refreshToken });

        return { status: HttpStatus.OK, body: { tokens: { accessToken, refreshToken } } };
    }

    public async requestVerification(currentUser: IUser): PromiseGenericResponse<null> {
        const { email } = currentUser;

        const otp = this.cryptoService.generateOtpCode();
        const key = this.redisHelperService.generateVerificationKey(email);

        await Promise.all([
            this.redisService.set(key, otp, RedisTTL.FIVE_MINUTE),
            this.mailSenderService.sendEmail(email, 'Account Verification', otp.toString()),
        ]);

        return { status: HttpStatus.OK, message: 'Otp has sent to the email!' };
    }

    public async verify(currentUser: IUser, otp: number): PromiseGenericResponse<null> {
        const { email, id } = currentUser;

        const otpFromRedis = await this.redisService.get(this.redisHelperService.generateVerificationKey(email));

        if (!otpFromRedis) {
            throw new OtpNotFoundException();
        }

        if (otp !== parseInt(otpFromRedis)) {
            throw new InvalidOtpException();
        }

        await Promise.all([
            this.userService.updateById(id, { verified: true }),
            this.redisService.delete(this.redisHelperService.generateVerificationKey(email)),
        ]);

        return { status: HttpStatus.OK, message: 'Your account has verified!' };
    }

    public me(currentUser: IUser): GenericResponse<{ user: IUser }> {
        const serializedUser = this.userService.serialize(currentUser);

        return { status: HttpStatus.OK, body: { user: serializedUser } };
    }

    public signTokens(payload: JwtPayloadInterface): Promise<[string, string]> {
        return Promise.all([
            this.jwtService.sign(payload, Token.ACCESS_TOKEN),
            this.jwtService.sign(payload, Token.REFRESH_TOKEN),
        ]);
    }

    public validate(email: string) {
        return this.userService.findOneByEmail(email);
    }

    public validateById(id: number) {
        return this.userService.findOneById(id);
    }
}
