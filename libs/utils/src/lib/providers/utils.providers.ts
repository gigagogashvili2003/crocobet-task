import { Provider } from '@nestjs/common';
import { CryptoService, JwtLibService, UtilsService } from '../services';
import { CRYPTO_SERVICE, JWT_SERVICE, UTILS_SERVICE } from '../constants';

export const utilsProviders: Array<Provider> = [
    { provide: UTILS_SERVICE, useClass: UtilsService },
    { provide: CRYPTO_SERVICE, useClass: CryptoService },
    { provide: JWT_SERVICE, useClass: JwtLibService },
];
