export declare class ItemFailedException extends Error {
    message: string;
    error: string;
    status: number;
    constructor(error: Partial<ItemFailedException>);
}
