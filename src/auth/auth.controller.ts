import { AuthService } from '@app/auth';
import { AUTH_SERVICE } from '@app/auth/lib/constants';
import { RefreshTokenDto, SignInDto, VerifyDto } from '@app/auth/lib/dtos';
import { RefreshTokenSchema, VerifySchema } from '@app/auth/lib/schemas';
import { AccessTokenGuard, LocalGuard, RefreshTokenGuard } from '@app/common';
import { CurrentUser } from '@app/common/lib/decorators';
import { JoiValidationPipe } from '@app/common/lib/pipes';
import { CreateUserSchema } from '@app/users';
import { CreateUserDto } from '@app/users/lib/dtos';
import { IUser } from '@app/users/lib/interfaces';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
    public constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    @UsePipes(new JoiValidationPipe(CreateUserSchema))
    public signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @UseGuards(LocalGuard)
    public signin(@CurrentUser() currentUser: IUser) {
        return this.authService.signin(currentUser);
    }
    @HttpCode(HttpStatus.OK)
    @Post('signout')
    @UseGuards(AccessTokenGuard)
    public signout(@CurrentUser() currentUser: IUser) {
        return this.authService.signout(currentUser);
    }
    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    @UseGuards(RefreshTokenGuard)
    // @UsePipes(new JoiValidationPipe(RefreshTokenSchema))
    public refreshToken(@CurrentUser() currentUser: IUser) {
        return this.authService.refreshToken(currentUser);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    @Post('request-verification')
    public requestVerification(@CurrentUser() user: IUser) {
        return this.authService.requestVerification(user);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    @Patch('verify')
    public verify(@CurrentUser() currentUser: IUser, @Query(new JoiValidationPipe(VerifySchema)) params: VerifyDto) {
        return this.authService.verify(currentUser, params.otp);
    }
}
