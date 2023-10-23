import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthExternal,
  CategoryExternal,
  CurrenciesExternal,
  ItemsExternal,
  UsersExternal,
} from './services';
import { CacheLocal } from '../../../common/local';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('MERCADO_LIBRE_URL'),
      }),
    }),
  ],
  controllers: [],
  providers: [
    AuthExternal,
    CategoryExternal,
    CurrenciesExternal,
    ItemsExternal,
    UsersExternal,
    CacheLocal,
  ],
  exports: [
    AuthExternal,
    CategoryExternal,
    CurrenciesExternal,
    ItemsExternal,
    UsersExternal,
    CacheLocal,
  ],
})
export class MercadoLibreModule {}
