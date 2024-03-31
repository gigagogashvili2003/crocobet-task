import { AccessTokenGuard } from '@app/common';
import { CurrentUser } from '@app/common/lib/decorators';
import { UsersService } from '@app/users';
import { USER_SERVICE } from '@app/users/lib/constants';
import { IUser } from '@app/users/lib/interfaces';
import { ProfileResponseEntity } from '@app/users/lib/response-entities';
import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
    public constructor(@Inject(USER_SERVICE) private readonly usersService: UsersService) {}

    @ApiResponse({ status: HttpStatus.OK, type: ProfileResponseEntity })
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('me')
    @UseGuards(AccessTokenGuard)
    public me(@CurrentUser() currentUser: IUser) {
        return this.usersService.me(currentUser);
    }
}
