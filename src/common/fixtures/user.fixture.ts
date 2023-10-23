import { UsersOutput } from "../external";

export const userFixture = (item: Partial<UsersOutput> = {}): UsersOutput => ({
    ...item,
    nickname: 'elconrado'
} as UsersOutput);