export declare class UsersInput {
    id: number;
}
export declare class UsersOutput {
    id: number;
    nickname: string;
    country_id: string;
    address: Address;
    user_type: string;
    site_id: string;
    permalink: string;
    seller_reputation: SellerReputation;
    status: Status;
}
export interface Address {
    city: string;
    state: string;
}
export interface SellerReputation {
    level_id: string;
    power_seller_status: null;
    transactions: Transactions;
}
export interface Transactions {
    period: string;
    total: number;
}
export interface Status {
    site_status: string;
}
