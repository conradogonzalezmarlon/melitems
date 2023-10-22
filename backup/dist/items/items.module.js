"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const items_controller_1 = require("./items.controller");
const items_service_1 = require("./items.service");
const local_1 = require("../common/local");
const constants_1 = require("../common/constants");
const items_batch_consumer_1 = require("./items-batch.consumer");
const external_1 = require("../common/external");
const repositories_1 = require("../common/repositories");
let ItemsModule = class ItemsModule {
};
exports.ItemsModule = ItemsModule;
exports.ItemsModule = ItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: constants_1.ITEMS_QUEUE,
                redis: {
                    host: 'localhost',
                    port: 6379
                }
            }),
            external_1.MercadoLibreModule
        ],
        controllers: [items_controller_1.ItemsController],
        providers: [
            items_service_1.ItemsService,
            local_1.FileTranslatorFactory,
            items_batch_consumer_1.ItemsBatchConsumer,
            repositories_1.ItemsRepositoryProvider,
        ],
    })
], ItemsModule);
//# sourceMappingURL=items.module.js.map