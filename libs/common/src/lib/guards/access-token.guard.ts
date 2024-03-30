import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Token } from '../enums'

@Injectable()
export class AccessTokenGuard extends AuthGuard(Token.ACCESS_TOKEN) {}
