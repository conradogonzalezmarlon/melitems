import { ItemsOutput } from "../external";

export const itemsFixture = (item: Partial<ItemsOutput> = {}): ItemsOutput => ({
    ...item,
    category_id: 'MLA_CATG',
    currency_id: 'ARG',
    seller_id: 3001,
    price: 23000,
    start_time: '2023-10-22',
} as ItemsOutput);