import { userFixture } from "../../../../../common/fixtures";

export class UsersExternalMock {
    getById() {
        return Promise.resolve(userFixture());
    }
}