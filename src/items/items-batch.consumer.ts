import { Inject } from '@nestjs/common';
import { ITEMS_QUEUE } from '../common/constants';
import { FileTranslation, QueueJob } from '../common/local';
import {
  CategoryExternal,
  CurrenciesExternal,
  ItemsExternal,
  UsersExternal,
} from '../common/external';
import { ItemFailedException } from '../common/exceptions';
import {
  ItemsRepository,
  ItemsRepositoryProvider,
} from '../common/repositories';
import { ItemsStatus } from '../common/schemas';
import { QueueProcess, QueueProcessor } from '../common/decorators';

@QueueProcessor(ITEMS_QUEUE)
export class ItemsBatchConsumer {
  constructor(
    private itemsExternal: ItemsExternal,
    private categoriesExternal: CategoryExternal,
    private currenciesExternal: CurrenciesExternal,
    private usersExternal: UsersExternal,
    @Inject(ItemsRepositoryProvider.provide)
    private itemsRepository: ItemsRepository,
  ) {}

  @QueueProcess()
  async saveItems({ data }: QueueJob<FileTranslation[]>) {
    const promises = data.map(this.saveOneItem.bind(this));
    await Promise.allSettled(promises);
  }

  async saveOneItem(data: FileTranslation): Promise<void> {
    const now = new Date();
    try {
      const item = await this.itemsExternal.getById({
        id: `${data.site}${data.id}`,
      });

      const [category, currency, user] = await Promise.all([
        this.categoriesExternal.getById({
          id: item.category_id,
        }),
        this.currenciesExternal.getById({
          id: item.currency_id,
        }),
        this.usersExternal.getById({
          id: item.seller_id,
        }),
      ]);

      await this.itemsRepository.save({
        price: item.price,
        start_time: item.start_time as string,
        name: category.name,
        description: currency.description,
        nickname: user.nickname,
        id: data.id,
        site: data.site,
        status: ItemsStatus.APPROVED,
        created_at: now,
      });
    } catch (e) {
      await this.itemsRepository.save({
        id: data.id,
        site: data.site,
        metadata: { error: e.response?.data ?? e.message },
        status: ItemsStatus.FAILED,
        created_at: now,
      });
      throw new ItemFailedException(e.response?.data);
    }
  }
}
