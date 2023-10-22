"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsBatchConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const constants_1 = require("../common/constants");
const external_1 = require("../common/external");
const exceptions_1 = require("../common/exceptions");
const repositories_1 = require("../common/repositories");
const schemas_1 = require("../common/schemas");
const os_1 = require("os");
console.log('availableParallelism', (0, os_1.availableParallelism)());
let ItemsBatchConsumer = class ItemsBatchConsumer {
    constructor(itemsExternal, categoriesExternal, currenciesExternal, usersExternal, itemsRepository) {
        this.itemsExternal = itemsExternal;
        this.categoriesExternal = categoriesExternal;
        this.currenciesExternal = currenciesExternal;
        this.usersExternal = usersExternal;
        this.itemsRepository = itemsRepository;
    }
    async saveItems({ data }) {
        const promises = data.map(this.saveOneItem.bind(this));
        await Promise.allSettled(promises);
    }
    async saveOneItem(data) {
        console.log(data);
        const now = new Date();
        try {
            const item = await this.itemsExternal.getById({
                id: `${data.site}${data.id}`,
            });
            const [category, currency, user] = await Promise.all([
                this.categoriesExternal.getById({
                    id: item.category_id,
                }),
                this.currenciesExternal.getById({
                    id: item.currency_id
                }),
                this.usersExternal.getById({
                    id: item.seller_id
                })
            ]);
            await this.itemsRepository.save({
                price: item.price,
                start_time: item.start_time,
                name: category.name,
                description: currency.description,
                nickname: user.nickname,
                id: data.id,
                site: data.site,
                status: schemas_1.ItemsStatus.APPROVED,
                created_at: now,
            });
        }
        catch (e) {
            await this.itemsRepository.save({
                id: data.id,
                site: data.site,
                metadata: { error: e.response?.data ?? e.message },
                status: schemas_1.ItemsStatus.FAILED,
                created_at: now,
            });
            throw new exceptions_1.ItemFailedException(e.response?.data);
        }
    }
};
exports.ItemsBatchConsumer = ItemsBatchConsumer;
__decorate([
    (0, bull_1.Process)({ concurrency: (0, os_1.availableParallelism)() }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsBatchConsumer.prototype, "saveItems", null);
exports.ItemsBatchConsumer = ItemsBatchConsumer = __decorate([
    (0, bull_1.Processor)(constants_1.ITEMS_QUEUE),
    __param(4, (0, common_1.Inject)(repositories_1.ItemsRepositoryProvider.provide)),
    __metadata("design:paramtypes", [external_1.ItemsExternal,
        external_1.CategoryExternal,
        external_1.CurrenciesExternal,
        external_1.UsersExternal, Object])
], ItemsBatchConsumer);
//# sourceMappingURL=items-batch.consumer.js.map