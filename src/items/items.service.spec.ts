import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import {
  fileJSONFixture,
  fileJSONFixture2,
  fileJSONlFixture,
} from '../common/fixtures';
import { FileTranslatorFactory, QueueLocal } from '../common/local';

describe('ItemsService', () => {
  let service: ItemsService;
  let translatorFactory: FileTranslatorFactory;
  let queueLocal: QueueLocal;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: FileTranslatorFactory,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: QueueLocal,
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(ItemsService);
    translatorFactory = module.get(FileTranslatorFactory);
    queueLocal = module.get(QueueLocal);
  });

  it('should upload items', async () => {
    const translate = jest.fn().mockImplementation((file: Buffer, cb) => {
      cb(fileJSONFixture, 0);
      cb(fileJSONFixture, 1);
      cb(fileJSONFixture, 2);
      cb(fileJSONFixture, 3);
      cb(fileJSONFixture, 4);
      cb(fileJSONFixture, 5);
      cb(fileJSONFixture, 6);
      cb(fileJSONFixture, 7);
      cb(fileJSONFixture, 8);
      cb(fileJSONFixture2, 9);
      cb(null, -1);
    });

    jest.spyOn(translatorFactory, 'get').mockReturnValue({
      translate,
    } as never);

    await expect(
      service.uploadItems(fileJSONlFixture as Express.Multer.File, {
        encoding: 'utf8',
        format: 'jsonl',
        separator: ',',
      }),
    ).resolves.toBe(
      `${fileJSONlFixture.originalname} received successfully. Uploading items...`,
    );
    expect(queueLocal.add).toBeCalledTimes(2);

    const arrayResponse = new Array(9).fill(fileJSONFixture);
    arrayResponse.push(fileJSONFixture2);
    expect(queueLocal.add).toBeCalledWith(arrayResponse);

    expect(queueLocal.add).toBeCalledWith([]);
  });
});
