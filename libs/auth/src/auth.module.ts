import { Module } from '@nestjs/common'
import { authProviders } from './lib/providers'

@Module({
    providers: [...authProviders],
    exports: [...authProviders],
})
export class AuthModule {}
