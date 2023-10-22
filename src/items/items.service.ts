import { Injectable } from '@nestjs/common';
import { UploadItemDto } from '../common/dto';
import { FileTranslation, FileTranslatorFactory } from '../common/local';
import { InjectQueue } from '@nestjs/bull'
import { ITEMS_QUEUE } from '../common/constants';
import { Queue } from 'bull';

@Injectable()
export class ItemsService {
  constructor(
    private readonly fileTranslatorFactory: FileTranslatorFactory,
    @InjectQueue(ITEMS_QUEUE) private itemsQueue: Queue
  ) {}

  async uploadItems(file: Express.Multer.File, data: UploadItemDto): Promise<string> {
    let batchLinesTranslated: FileTranslation[] = [];

    const sendLine = (lineTranslated: FileTranslation, index: number) => {
      // last event
      if (index === -1) {
        this.itemsQueue.add(batchLinesTranslated);
        return;
      }

      if (!lineTranslated) {
        return;
      }

      batchLinesTranslated.push(lineTranslated);

      if (batchLinesTranslated.length === 5) {
        this.itemsQueue.add([...batchLinesTranslated])
        batchLinesTranslated = [];
      }
    }

    this.fileTranslatorFactory
      .get(data)
      .translate(file.buffer, sendLine)

    return `${file.originalname} received successfully. Uploading items...`;
  }
}
