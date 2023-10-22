import { FileTranslation, FileTranslatorInput } from "..";
import { FileTranslatorBase } from "../file-translator-base";

export class DefaultTranslator extends FileTranslatorBase {
    private separator: string;
    private readedLines: number;

    constructor(data: FileTranslatorInput) {
        super(data);
        this.separator = data.separator;
        this.encoding = data.encoding;
        this.readedLines = 0;
    }

    translate(file: Buffer, cb: (line: FileTranslation, index: number) => void): void {
        this.readEachLine(file, (lineStr: string, i: number) => {
            if (i === -1) {
                return cb(null, i);
            }

            const lineObj = this.transform(lineStr);

            if (!lineObj) {
                return;
            }

            cb(lineObj, i);
        });
    }

    private transform(line: string): FileTranslation {
        if (this.readedLines !== 0) {
            const [site, id] = line.split(this.getSeparator);
            return { site, id };
        }
        this.readedLines++;
    }

    private get getSeparator() {
        if (this.separator === '\\t') {
            return '\t';
        }

        return this.separator;
    } 
}