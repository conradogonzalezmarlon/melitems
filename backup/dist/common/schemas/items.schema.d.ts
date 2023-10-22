export declare enum ItemsStatus {
    APPROVED = "APPROVED",
    FAILED = "FAILED"
}
export declare class ItemsSchema {
    site: string;
    id: string;
    price?: number;
    start_time?: string;
    name?: string;
    description?: string;
    nickname?: string;
    metadata?: object;
    status: ItemsStatus;
    created_at?: Date;
}
