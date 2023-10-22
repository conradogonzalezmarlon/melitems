"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTranslator = void 0;
const readline_1 = require("readline");
const stream_1 = require("stream");
const utils_1 = require("../../../../common/utils");
class DefaultTranslator {
    constructor(data) {
        this.separator = data.separator;
        this.encoding = data.encoding;
        this.readedLines = 0;
    }
    translate(file, cb) {
        const readableStream = new stream_1.Readable();
        readableStream.push(file);
        readableStream.push(null);
        const rl = (0, readline_1.createInterface)({
            input: readableStream.pipe(this.changeEncoding()),
            crlfDelay: Infinity,
        });
        let index = 0;
        rl.on('line', (line) => {
            cb(this.transform(line), index);
            index++;
        });
        rl.on('close', () => {
            cb(null, -1);
        });
    }
    changeEncoding(encoding = this.encoding) {
        return new stream_1.Transform({
            transform(chunk, _encoding, callback) {
                const text = chunk.toString('utf8');
                const decoded = (0, utils_1.decodeText)(text, encoding, 'utf8');
                this.push(decoded);
                callback();
            }
        });
    }
    transform(line) {
        if (this.readedLines !== 0) {
            const [site, id] = line.split(this.getSeparator);
            return { site, id };
        }
        this.readedLines++;
    }
    get getSeparator() {
        if (this.separator === '\\t') {
            return '\t';
        }
        return this.separator;
    }
}
exports.DefaultTranslator = DefaultTranslator;
//# sourceMappingURL=default-translator.js.map