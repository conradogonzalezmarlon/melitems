"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileStream = exports.decodeText = void 0;
const fs_1 = require("fs");
const stream_1 = require("stream");
const decodeText = (text, sourceEncoding, destEncoding) => {
    return Buffer.from(text, sourceEncoding).toString(destEncoding);
};
exports.decodeText = decodeText;
const writeFileStream = (file, path, encoding) => {
    const tranform = () => new stream_1.Transform({
        transform(chunk, _encoding, callback) {
            const text = chunk.toString('utf8');
            this.push((0, exports.decodeText)(text, encoding, 'utf8'));
            callback();
        }
    });
    return new Promise((resolve, reject) => {
        const readableStream = new stream_1.Readable();
        readableStream.push(file);
        readableStream.push(null);
        const dest = (0, fs_1.createWriteStream)(path);
        readableStream.pipe(tranform()).pipe(dest);
        dest.on('finish', () => {
            return resolve(path);
        });
        dest.on('error', (e) => {
            return reject(e);
        });
    });
};
exports.writeFileStream = writeFileStream;
//# sourceMappingURL=file.util.js.map