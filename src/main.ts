import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { CacheLocal } from './common/local';
import { connectMongo } from './common/local/mongo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cacheLocal = await app.resolve(CacheLocal);
  await cacheLocal.start();

  await connectMongo();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  console.log('App running on localhost:3000');
}
bootstrap();
