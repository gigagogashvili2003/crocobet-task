import { Module } from '@nestjs/common'
import { utilsProviders } from './lib/providers'

@Module({
    providers: [...utilsProviders],
    exports: [...utilsProviders],
})
export class UtilsModule {}
