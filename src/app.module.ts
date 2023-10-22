import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items';
import { ConfigModule } from '@nestjs/config';
import { CacheLocal } from './common/local';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ItemsModule],
  controllers: [AppController],
  providers: [AppService, CacheLocal],
})
export class AppModule {}
