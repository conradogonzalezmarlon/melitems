"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoLibreModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const services_1 = require("./services");
const local_1 = require("../../../common/local");
let MercadoLibreModule = class MercadoLibreModule {
};
exports.MercadoLibreModule = MercadoLibreModule;
exports.MercadoLibreModule = MercadoLibreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    baseURL: config.get('MERCADO_LIBRE_URL'),
                })
            })
        ],
        controllers: [],
        providers: [services_1.AuthExternal, services_1.CategoryExternal, services_1.CurrenciesExternal, services_1.ItemsExternal, services_1.UsersExternal, local_1.CacheLocal],
        exports: [services_1.AuthExternal, services_1.CategoryExternal, services_1.CurrenciesExternal, services_1.ItemsExternal, services_1.UsersExternal, local_1.CacheLocal],
    })
], MercadoLibreModule);
//# sourceMappingURL=mercado-libre.module.js.map