import { Module } from '@nestjs/common';
import { bookProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './lib/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [...bookProviders],
    exports: [...bookProviders],
})
export class BooksModule {}
