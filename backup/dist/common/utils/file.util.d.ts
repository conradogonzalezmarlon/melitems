/// <reference types="node" />
export declare const decodeText: (text: string, sourceEncoding: BufferEncoding, destEncoding: BufferEncoding) => string;
export declare const writeFileStream: (file: Buffer, path: string, encoding: BufferEncoding) => Promise<string>;
