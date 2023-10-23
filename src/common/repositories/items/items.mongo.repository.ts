import { ItemsSchema } from '../../../common/schemas';
import { MongoRepository } from '../../../common/local/mongo';
import { ItemsRepository } from '.';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsMongoRepository
  extends MongoRepository<ItemsSchema>
  implements ItemsRepository
{
  constructor() {
    super();
  }

  public async save(item: ItemsSchema): Promise<void> {
    await this.collection('items').insertOne(item);
  }
}
