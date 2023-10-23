import { currencyFixture } from "../../../../../common/fixtures";

export class CurrenciesExternalMock {
    getById() {
        return Promise.resolve(currencyFixture());
    }
}