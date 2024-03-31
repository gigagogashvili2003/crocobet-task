import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Token } from '@app/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtLibService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    public async sign<P extends Object | Buffer>(payload: P, type: Token = Token.ACCESS_TOKEN): Promise<string> {
        try {
            let token: string;
            switch (type) {
                case Token.ACCESS_TOKEN:
                    token = await this.jwtService.signAsync(payload, {
                        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
                        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                    });

                    break;
                case Token.REFRESH_TOKEN:
                    token = await this.jwtService.signAsync(payload, {
                        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
                        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
                    });
                    break;
            }
            return token;
        } catch (err) {
            throw err;
        }
    }
}
