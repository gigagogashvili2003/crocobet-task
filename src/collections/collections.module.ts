import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsLibModule } from '@app/collections';

@Module({
    imports: [CollectionsLibModule],
    controllers: [CollectionsController],
})
export class CollectionsModule {}
