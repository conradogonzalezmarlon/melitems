import { Test } from "@nestjs/testing";
import { ItemsBatchConsumer } from "./items-batch.consumer";
import { categoryFixture, currencyFixture, fileArrayJSONFixture, itemsFixture, userFixture } from "../common/fixtures";
import { CategoryExternal, CurrenciesExternal, ItemsExternal, UsersExternal } from "../common/external";
import { ItemsExternalMock, CategoryExternalMock, CurrenciesExternalMock, UsersExternalMock } from "../mocks/common/external/mercado-libre/services";
import { ItemsRepository, ItemsRepositoryProvider } from "../common/repositories";
import { ItemsRepositoryMock } from "../mocks/common/repositories/items";
import { ItemsStatus } from "../common/schemas";

describe('ItemsBatchConsumer', () => {
  let itemsBatchConsumer: ItemsBatchConsumer;
  let itemsRepository: ItemsRepository;
  let usersExternal: UsersExternal;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsBatchConsumer,
        {
          provide: ItemsExternal,
          useClass: ItemsExternalMock
        },
        {
          provide: CategoryExternal,
          useClass: CategoryExternalMock
        },
        {
          provide: CurrenciesExternal,
          useClass: CurrenciesExternalMock
        },
        {
          provide: UsersExternal,
          useClass: UsersExternalMock,
        },
        {
          provide: ItemsRepositoryProvider.provide,
          useClass: ItemsRepositoryMock,
        }
      ]
    }).compile();

    itemsBatchConsumer = module.get(ItemsBatchConsumer);
    itemsRepository = module.get(ItemsRepositoryProvider.provide);
    usersExternal = module.get(UsersExternal);
  });

  beforeEach(() => {
    jest.spyOn(itemsRepository, 'save').mockResolvedValue();
  })

  it('should save items successfully', async () => {
    const itemsQuantity = 3;
    const items = fileArrayJSONFixture(itemsQuantity);

    await itemsBatchConsumer.saveItems({
      id: 'process-id',
      data: items
    })

    expect(itemsRepository.save).toBeCalledTimes(itemsQuantity);
    expect(itemsRepository.save).toHaveBeenNthCalledWith(1, {
      "created_at": expect.any(Date),
      "description": currencyFixture().description,
      "id": items[0].id,
      "name": categoryFixture().name,
      "nickname": userFixture().nickname,
      "price": itemsFixture().price,
      "site": items[0].site,
      "start_time": itemsFixture().start_time,
      "status": ItemsStatus.APPROVED,
    });
  })

  it('should save item with error', async () => {
    const exception = new Error('User not found');
    jest.spyOn(usersExternal, 'getById').mockRejectedValue(exception);

    const itemsQuantity = 1;
    const items = fileArrayJSONFixture(itemsQuantity);
    await itemsBatchConsumer.saveItems({
      id: 'process-id',
      data: items
    })

    expect(itemsRepository.save).toBeCalledTimes(itemsQuantity);
    expect(itemsRepository.save).toHaveBeenNthCalledWith(1, {
      "created_at": expect.any(Date),
      "id": items[0].id,
      "site": items[0].site,
      "status": ItemsStatus.FAILED,
      metadata: { error: exception.message }
    });
  })
})