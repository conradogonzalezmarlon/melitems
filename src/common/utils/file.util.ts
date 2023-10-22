import { createWriteStream } from "fs";
import { Readable, Transform } from "stream";

export const decodeText = (text: string, sourceEncoding: BufferEncoding, destEncoding: BufferEncoding) => {
    return Buffer.from(text, sourceEncoding).toString(destEncoding);
}

export const writeFileStream = (
    file: Buffer,
    path: string,
    encoding: BufferEncoding
): Promise<string> => {
    const tranform = () => 
        new Transform({
            transform(chunk, _encoding, callback) {
                const text = chunk.toString('utf8')
                this.push(decodeText(text, encoding, 'utf8'))
                callback()
            }
        })
    
    return new Promise((resolve, reject) => {
        const readableStream = new Readable();
        readableStream.push(file);
        readableStream.push(null)
    
        const dest = createWriteStream(path)
        readableStream.pipe(tranform()).pipe(dest)
    
        dest.on('finish', () => {
            return resolve(path);
        })

        dest.on('error', (e) => {
            return reject(e);
        })
    })
}