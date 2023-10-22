import { ItemsSchema } from "../../../common/schemas";
import { MongoRepository } from "../../../common/local/mongo";
import { ItemsRepository } from ".";
export declare class ItemsMongoRepository extends MongoRepository<ItemsSchema> implements ItemsRepository {
    constructor();
    save(item: ItemsSchema): Promise<void>;
}
