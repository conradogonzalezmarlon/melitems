"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const local_1 = require("../local");
const cache = new local_1.CacheLocal();
function Cache(params) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const key = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;
            const data = await cache.get(key);
            if (data) {
                return data;
            }
            const result = await originalMethod.apply(this, args);
            await cache.set(key, result, params.ttl);
            return result;
        };
        return descriptor;
    };
}
exports.Cache = Cache;
//# sourceMappingURL=cache.decorator.js.map