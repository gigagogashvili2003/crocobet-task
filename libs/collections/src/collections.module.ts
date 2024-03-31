import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './lib/entities';
import { collectionProviders } from './lib/providers';
import { RedisModule } from '@app/redis';

@Module({
    imports: [TypeOrmModule.forFeature([Collection]), RedisModule],
    providers: [...collectionProviders],
    exports: [...collectionProviders],
})
export class CollectionsLibModule {}
