import { categoryFixture } from "../../../../../common/fixtures";

export class CategoryExternalMock {
    getById() {
        return Promise.resolve(categoryFixture());
    }
}