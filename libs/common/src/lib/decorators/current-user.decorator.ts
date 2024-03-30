import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUser } from '@app/users/lib/interfaces';
import { RequestWithUser } from '../interfaces';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: RequestWithUser<IUser> = ctx.switchToHttp().getRequest();
    return request.user;
});
