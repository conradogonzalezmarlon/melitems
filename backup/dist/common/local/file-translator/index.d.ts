/// <reference types="node" />
export * from './file-translator.factory';
export declare class FileTranslation {
    site: string;
    id: string;
}
export declare class FileTranslatorInput {
    separator: string;
    encoding: BufferEncoding;
}
export interface FileTranslator {
    translate(file: Buffer, cb: (lineTranslated: FileTranslation, index: number) => void): void;
}
export declare class FileTranslatorFactoryInput {
    separator: string;
    encoding: BufferEncoding;
    format: string;
}
