import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class CacheLocal {
  private client: RedisClientType;
  constructor() {}

  async start(): Promise<void> {
    if (!this.client) {
      this.client = (await createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        database: 0,
      }).connect()) as never;
    }
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.start();
    await this.client.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  }

  async get<T>(key: string): Promise<T> {
    await this.start();
    const data = await this.client.get(key);
    return JSON.parse(data) as T;
  }
}
