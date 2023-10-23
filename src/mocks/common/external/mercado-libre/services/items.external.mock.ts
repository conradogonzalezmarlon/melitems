import { itemsFixture } from "../../../../../common/fixtures";

export class ItemsExternalMock {
    getById() {
        return Promise.resolve(itemsFixture());
    }
}