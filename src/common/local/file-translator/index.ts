export * from './file-translator.factory';

export class FileTranslation {
  site: string;
  id: string;
}

export class FileTranslatorInput {
  separator?: string;
  encoding: BufferEncoding;
}

export class FileTranslatorFactoryInput {
  separator: string;
  encoding: BufferEncoding;
  format: string;
}
