import { ItemsSchema } from '../../schemas';
import { ItemsMongoRepository } from './items.mongo.repository';
export interface ItemsRepository {
    save(item: ItemsSchema): Promise<void>;
}
export declare const ItemsRepositoryProvider: {
    provide: string;
    useClass: typeof ItemsMongoRepository;
};
