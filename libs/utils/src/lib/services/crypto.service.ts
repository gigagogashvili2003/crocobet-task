import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
    public comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

    public async hashPassword(payload: string, saltValue = 10) {
        const salt = await this.generateSaltValue(saltValue);
        return await bcrypt.hash(payload, salt);
    }

    private generateSaltValue(saltValue: number) {
        return bcrypt.genSalt(saltValue);
    }

    public generateOtpCode() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
