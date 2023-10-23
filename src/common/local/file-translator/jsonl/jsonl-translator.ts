import { FileTranslation, FileTranslatorInput } from '..';
import { FileTranslatorBase } from '../file-translator-base';

export class JSONLTranslator extends FileTranslatorBase {
  constructor(data: FileTranslatorInput) {
    super(data);
    this.encoding = data.encoding;
  }

  translate(
    file: Buffer,
    cb: (line: FileTranslation, index: number) => void,
  ): void {
    this.readEachLine(file, (lineStr: string, i) => {
      const lineObj = this.transform(lineStr);

      if (!lineObj) {
        return;
      }

      cb(lineObj, i);
    });
  }

  private transform(line: string): FileTranslation {
    let obj: FileTranslation;
    try {
      obj = JSON.parse(line);
    } catch (e) {}
    return obj;
  }
}
