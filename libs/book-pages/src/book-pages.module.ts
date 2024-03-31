import { Module } from '@nestjs/common';
import { bookPageProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookPage } from './lib/entities';

@Module({
    imports: [TypeOrmModule.forFeature([BookPage])],
    providers: [...bookPageProviders],
    exports: [...bookPageProviders],
})
export class BookPagesModule {}
