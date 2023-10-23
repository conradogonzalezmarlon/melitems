export * from './queue.local';
export * from './queue.module';

export class QueueJob<T> {
  data: T;
  id: string;
}
