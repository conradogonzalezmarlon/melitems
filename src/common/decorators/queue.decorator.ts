import { Process, Processor } from '@nestjs/bull';
import { applyDecorators } from '@nestjs/common';
import { availableParallelism } from 'os';

console.log('availableParallelism', availableParallelism());

export function QueueProcessor(queueName: string) {
  return applyDecorators(Processor(queueName));
}

export function QueueProcess() {
  return applyDecorators(Process({ concurrency: availableParallelism() }));
}
