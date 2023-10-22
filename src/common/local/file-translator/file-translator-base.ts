import { Readable, Transform } from "stream";
import { FileTranslation, FileTranslatorInput } from ".";
import { createInterface } from "readline";
import { decodeText } from "../../utils";

export abstract class FileTranslatorBase {
    encoding: BufferEncoding;
    constructor(data: FileTranslatorInput) {
        this.encoding = data.encoding;
    }

    abstract translate(file: Buffer, cb: (lineTranslated: FileTranslation, index: number) => void): void;
    
    protected readEachLine(file: Buffer, cb: (line: string, index: number) => void) {
        const readableStream = new Readable();
        readableStream.push(file);
        readableStream.push(null)

        const rl = createInterface({
            input: readableStream.pipe(this.changeEncoding()),
            crlfDelay: Infinity,
        })

        let index = 0;
        rl.on('line', (line: string) => {
            cb(line, index)
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
}