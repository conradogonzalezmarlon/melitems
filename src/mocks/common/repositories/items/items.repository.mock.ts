import { ItemsSchema } from "src/common/schemas";
import { ItemsRepository } from "../../../../common/repositories";

export class ItemsRepositoryMock implements ItemsRepository {
    save(item: ItemsSchema): Promise<void> {
        return Promise.resolve();
    }
}