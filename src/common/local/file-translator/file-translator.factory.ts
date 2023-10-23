import { Injectable } from '@nestjs/common';
import { DefaultTranslator } from './default';
import { FileTranslatorFactoryInput } from '.';
import { JSONLTranslator } from './jsonl';
import { FileTranslatorBase } from './file-translator-base';

@Injectable()
export class FileTranslatorFactory {
  get(input: FileTranslatorFactoryInput): FileTranslatorBase {
    if (input.format === 'jsonl') {
      return new JSONLTranslator({
        separator: input.separator,
        encoding: input.encoding,
      });
    }

    return new DefaultTranslator({
      separator: input.separator,
      encoding: input.encoding,
    });
  }
}
