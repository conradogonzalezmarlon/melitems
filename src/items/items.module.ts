import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { FileTranslatorFactory } from '../common/local';
import { ITEMS_QUEUE } from '../common/constants';
import { ItemsBatchConsumer } from './items-batch.consumer';
import { MercadoLibreModule } from '../common/external';
import { ItemsRepositoryProvider } from '../common/repositories';
import 'dotenv/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: ITEMS_QUEUE,
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      }
    }),
    MercadoLibreModule
  ],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    FileTranslatorFactory,
    ItemsBatchConsumer,
    ItemsRepositoryProvider,
  ],
})
export class ItemsModule {}
