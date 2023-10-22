import { Injectable } from '@nestjs/common';
import { UploadItemDto } from '../common/dto';
import {
  FileTranslation,
  FileTranslatorFactory,
  QueueLocal,
} from '../common/local';
import { BATCH_ITEMS_NUM } from '../common/constants';

@Injectable()
export class ItemsService {
  constructor(
    private fileTranslatorFactory: FileTranslatorFactory,
    private queueLocal: QueueLocal,
  ) {}

  async uploadItems(
    file: Express.Multer.File,
    data: UploadItemDto,
  ): Promise<string> {
    let batchLinesTranslated: FileTranslation[] = [];

    const sendLine = (lineTranslated: FileTranslation, index: number) => {
      // last event
      if (index === -1) {
        this.queueLocal.add(batchLinesTranslated);
        return;
      }

      if (!lineTranslated) {
        return;
      }

      batchLinesTranslated.push(lineTranslated);

      if (batchLinesTranslated.length === BATCH_ITEMS_NUM) {
        this.queueLocal.add([...batchLinesTranslated]);
        batchLinesTranslated = [];
      }
    };

    this.fileTranslatorFactory.get(data).translate(file.buffer, sendLine);

    return `${file.originalname} received successfully. Uploading items...`;
  }
}
