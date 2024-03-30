import { Module } from '@nestjs/common';
import { bookProviders } from './lib/providers';

@Module({
    providers: [...bookProviders],
    exports: [...bookProviders],
})
export class BooksModule {}
