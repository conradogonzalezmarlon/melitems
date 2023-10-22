import { createInterface } from "readline";
import { Readable, Transform } from "stream";
import { FileTranslation, FileTranslator, FileTranslatorInput } from "..";
import { decodeText } from "../../../../common/utils";

export class DefaultTranslator implements FileTranslator {
    private separator: string;
    private readedLines: number;
    private encoding: BufferEncoding;

    constructor(data: FileTranslatorInput) {
        this.separator = data.separator;
        this.encoding = data.encoding;
        this.readedLines = 0;
    }

    translate(file: Buffer, cb: (line: FileTranslation, index: number) => void): void {
        const readableStream = new Readable();
        readableStream.push(file);
        readableStream.push(null)

        const rl = createInterface({
            input: readableStream.pipe(this.changeEncoding()),
            crlfDelay: Infinity,
        })

        let index = 0;
        rl.on('line', (line: string) => {
            cb(this.transform(line), index)
            index++;
        });

        rl.on('close', () => {
            cb(null, -1);
        })
    }

    private changeEncoding(encoding = this.encoding): Transform {
        return new Transform({
            transform(chunk, _encoding, callback) {
                const text = chunk.toString('utf8')
                const decoded = decodeText(text, encoding, 'utf8')
                this.push(decoded)
                callback()
            }
        })
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