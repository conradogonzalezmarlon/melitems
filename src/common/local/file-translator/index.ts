export * from './file-translator.factory';

export class FileTranslation {
    site: string;
    id: string;
}

export class FileTranslatorInput {
    separator: string;
    encoding: BufferEncoding;
}

export interface FileTranslator {
    translate(file: Buffer, cb: (lineTranslated: FileTranslation, index: number) => void): void;
}

export class FileTranslatorFactoryInput {
    separator: string;
    encoding: BufferEncoding;
    format: string;
}

