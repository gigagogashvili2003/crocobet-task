import { Provider } from '@nestjs/common'
import { UtilsService } from '../services'
import { UTILS_SERVICE } from '../constants'

export const utilsProviders: Array<Provider> = [{ provide: UTILS_SERVICE, useClass: UtilsService }]
