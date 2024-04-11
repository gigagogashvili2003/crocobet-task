import { Module } from '@nestjs/common';
import { ChatGateway } from './lib/gateways';
import { UtilsModule } from '@app/utils';
import { chatProvidrs } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './lib/entities';
import { UsersLibModule } from '@app/users';
import { RedisModule } from '@app/redis';

@Module({
    imports: [TypeOrmModule.forFeature([Chat]), UtilsModule, UsersLibModule, RedisModule],
    providers: [...chatProvidrs, ChatGateway],
    exports: [...chatProvidrs],
})
export class ChatModule {}
