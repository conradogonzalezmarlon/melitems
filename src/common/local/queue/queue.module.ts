import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ITEMS_QUEUE } from '../../constants';
import { QueueLocal } from './queue.local';
import 'dotenv/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: ITEMS_QUEUE,
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
  ],
  providers: [QueueLocal],
  exports: [QueueLocal],
})
export class QueueLocalModule {}
