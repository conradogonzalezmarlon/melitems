import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ITEMS_QUEUE } from '../../constants';
import { Queue } from 'bull';

@Injectable()
export class QueueLocal {
  constructor(@InjectQueue(ITEMS_QUEUE) private itemsQueue: Queue) {}

  add(msg: object) {
    this.itemsQueue.add(msg);
  }
}
