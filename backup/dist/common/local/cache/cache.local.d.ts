export declare class CacheLocal {
    private client;
    constructor();
    start(): Promise<void>;
    set<T>(key: string, value: T, ttl: number): Promise<void>;
    get<T>(key: string): Promise<T>;
}
