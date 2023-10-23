import { Module } from '@nestjs/common';
import { ItemsModule } from './items';
import { ConfigModule } from '@nestjs/config';
import { CacheLocal } from './common/local';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ItemsModule],
  controllers: [],
  providers: [CacheLocal],
})
export class AppModule {}
