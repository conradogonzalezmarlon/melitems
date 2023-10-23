import { CurrenciesOutput } from "../external";

export const currencyFixture = (item: Partial<CurrenciesOutput> = {}): CurrenciesOutput => ({
    ...item,
    description: 'Peso Colombiano'
} as CurrenciesOutput);