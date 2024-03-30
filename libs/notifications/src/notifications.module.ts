import { Module } from '@nestjs/common';
import { notificationProviders } from './lib/providers';

@Module({
    providers: [...notificationProviders],
    exports: [...notificationProviders],
})
export class NotificationsModule {}
