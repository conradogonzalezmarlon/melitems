import { Job } from "bull";
import { FileTranslation } from '../common/local';
import { CategoryExternal, CurrenciesExternal, ItemsExternal, UsersExternal } from '../common/external';
import { ItemsRepository } from '../common/repositories';
export declare class ItemsBatchConsumer {
    private itemsExternal;
    private categoriesExternal;
    private currenciesExternal;
    private usersExternal;
    private itemsRepository;
    constructor(itemsExternal: ItemsExternal, categoriesExternal: CategoryExternal, currenciesExternal: CurrenciesExternal, usersExternal: UsersExternal, itemsRepository: ItemsRepository);
    saveItems({ data }: Job<FileTranslation[]>): Promise<void>;
    saveOneItem(data: FileTranslation): Promise<void>;
}
