/// <reference types="node" />
import { FileTranslation, FileTranslator, FileTranslatorInput } from "..";
export declare class DefaultTranslator implements FileTranslator {
    private separator;
    private readedLines;
    private encoding;
    constructor(data: FileTranslatorInput);
    translate(file: Buffer, cb: (line: FileTranslation, index: number) => void): void;
    private changeEncoding;
    private transform;
    private get getSeparator();
}
