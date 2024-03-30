import { AuthService } from '@app/auth';
import { AUTH_SERVICE } from '@app/auth/lib/constants';
import { VerifyDto } from '@app/auth/lib/dtos';
import { VerifySchema } from '@app/auth/lib/schemas';
import { AccessTokenGuard, LocalGuard, RefreshTokenGuard } from '@app/common';
import { CurrentUser } from '@app/common/lib/decorators';
import { JoiValidationPipe } from '@app/common/lib/pipes';
import { CreateUserSchema } from '@app/users';
import { CreateUserDto } from '@app/users/lib/dtos';
import { IUser } from '@app/users/lib/interfaces';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';

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
    public verify(@Body(new JoiValidationPipe(VerifySchema)) verifyDto: VerifyDto, @CurrentUser() currentUser: IUser) {
        return this.authService.verify(currentUser, verifyDto.code);
    }

    @Get('me')
    @UseGuards(AccessTokenGuard)
    public me(@CurrentUser() currentUser: IUser) {
        return currentUser;
    }
}
