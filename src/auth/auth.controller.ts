import { AuthService } from '@app/auth';
import { AUTH_SERVICE } from '@app/auth/lib/constants';
import { RefreshTokenDto, SignInDto, VerifyDto } from '@app/auth/lib/dtos';
import { VerifySchema } from '@app/auth/lib/schemas';
import { AccessTokenGuard, LocalGuard, RefreshTokenGuard } from '@app/common';
import { CurrentUser } from '@app/common/lib/decorators';
import { SessionNotFoundException } from '@app/common/lib/exceptions';
import { JoiValidationPipe } from '@app/common/lib/pipes';
import { CreateUserSchema } from '@app/users';
import { CreateUserDto } from '@app/users/lib/dtos';
import { IUser } from '@app/users/lib/interfaces';
import { ProfileResponseEntity } from '@app/users/lib/response-entities';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    public constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {}

    @ApiResponse({ description: 'Creates new user', status: HttpStatus.CREATED })
    @ApiResponse({ description: 'User Already exists exception', status: HttpStatus.CONFLICT })
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    @UsePipes(new JoiValidationPipe(CreateUserSchema))
    public signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @ApiBody({ type: SignInDto })
    @ApiResponse({ description: 'User not found', status: HttpStatus.NOT_FOUND })
    @ApiResponse({ description: 'Invalid password', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({ status: HttpStatus.OK })
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @UseGuards(LocalGuard)
    public signin(@CurrentUser() currentUser: IUser) {
        return this.authService.signin(currentUser);
    }

    @ApiResponse({ description: 'Session not found', status: HttpStatus.NOT_FOUND })
    @HttpCode(HttpStatus.OK)
    @Post('signout')
    @UseGuards(AccessTokenGuard)
    public signout(@CurrentUser() currentUser: IUser) {
        return this.authService.signout(currentUser);
    }

    @ApiBody({ type: RefreshTokenDto })
    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    @UseGuards(RefreshTokenGuard)
    public refreshToken(@CurrentUser() currentUser: IUser) {
        return this.authService.refreshToken(currentUser);
    }

    @ApiResponse({ description: 'Account verification request', status: HttpStatus.OK })
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    @Post('request-verification')
    public requestVerification(@CurrentUser() user: IUser) {
        return this.authService.requestVerification(user);
    }

    @ApiResponse({ description: 'OTP Expired', status: HttpStatus.NOT_FOUND })
    @ApiResponse({ description: 'Invalid OTP', status: HttpStatus.BAD_REQUEST })
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    @Patch('verify')
    public verify(@Body(new JoiValidationPipe(VerifySchema)) verifyDto: VerifyDto, @CurrentUser() currentUser: IUser) {
        return this.authService.verify(currentUser, verifyDto.code);
    }
}
