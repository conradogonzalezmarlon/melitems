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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrenciesExternal = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const types_1 = require("../types");
const auth_external_1 = require("./auth.external");
const decorators_1 = require("../../../decorators");
let CurrenciesExternal = class CurrenciesExternal {
    constructor(httpService, authExternal) {
        this.httpService = httpService;
        this.authExternal = authExternal;
    }
    async getById(input) {
        const { access_token, token_type } = await this.authExternal.getAccessToken();
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`/currencies/${input.id}`, {
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }));
        return data;
    }
};
exports.CurrenciesExternal = CurrenciesExternal;
__decorate([
    (0, decorators_1.Cache)({ ttl: 60 * 60 * 24 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CurrenciesInput]),
    __metadata("design:returntype", Promise)
], CurrenciesExternal.prototype, "getById", null);
exports.CurrenciesExternal = CurrenciesExternal = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        auth_external_1.AuthExternal])
], CurrenciesExternal);
//# sourceMappingURL=currencies.external.js.map