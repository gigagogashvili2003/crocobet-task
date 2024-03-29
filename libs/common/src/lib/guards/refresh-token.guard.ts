import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Token } from '../enums'

@Injectable()
export class RefreshTokenGuard extends AuthGuard(Token.REFRESH_TOKEN) {}
