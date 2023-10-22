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
exports.CacheLocal = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let CacheLocal = class CacheLocal {
    constructor() { }
    async start() {
        if (!this.client) {
            this.client = await (0, redis_1.createClient)({
                url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
                database: 0,
            }).connect();
        }
    }
    async set(key, value, ttl) {
        await this.start();
        await this.client.set(key, JSON.stringify(value), {
            EX: ttl,
        });
    }
    async get(key) {
        await this.start();
        const data = await this.client.get(key);
        return JSON.parse(data);
    }
};
exports.CacheLocal = CacheLocal;
exports.CacheLocal = CacheLocal = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CacheLocal);
//# sourceMappingURL=cache.local.js.map