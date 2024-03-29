import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@app/redis';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
