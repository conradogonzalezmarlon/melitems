import { CacheLocal } from '../local';
const cache = new CacheLocal();

export function Cache(params: { ttl: number }) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
      
        descriptor.value = async function (...args: any[]) {
          const key = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;
          const data = await cache.get(key)

          if (data) {
            return data;
          }
      
          const result = await originalMethod.apply(this, args);
          await cache.set(key, result, params.ttl);
      
          return result;
        };
      
        return descriptor;
      }
}
