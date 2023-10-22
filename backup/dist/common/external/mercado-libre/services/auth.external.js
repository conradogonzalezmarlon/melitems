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
exports.AuthExternal = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const decorators_1 = require("../../../decorators");
let AuthExternal = class AuthExternal {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async getAccessToken() {
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.post('/oauth/token', {
            refresh_token: this.configService.get('MERCADO_LIBRE_REFRESH_TOKEN'),
            grant_type: 'refresh_token',
            client_id: this.configService.get('MERCADO_LIBRE_CLIENT_ID'),
            client_secret: this.configService.get('MERCADO_LIBRE_CLIENT_SECRET'),
        }));
        return data;
    }
};
exports.AuthExternal = AuthExternal;
__decorate([
    (0, decorators_1.Cache)({ ttl: 60 * 60 * 5 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthExternal.prototype, "getAccessToken", null);
exports.AuthExternal = AuthExternal = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, config_1.ConfigService])
], AuthExternal);
//# sourceMappingURL=auth.external.js.map