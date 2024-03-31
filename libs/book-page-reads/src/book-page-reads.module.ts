import { Module } from '@nestjs/common';
import { bookPageReadProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookPageRead } from './lib/entities';

@Module({
    imports: [TypeOrmModule.forFeature([BookPageRead])],
    providers: [...bookPageReadProviders],
    exports: [...bookPageReadProviders],
})
export class BookPageReadsModule {}
