import { CategoryOutput } from "../external";

export const categoryFixture = (item: Partial<CategoryOutput> = {}): CategoryOutput => ({
    ...item,
    name: 'Category 001'
} as CategoryOutput);