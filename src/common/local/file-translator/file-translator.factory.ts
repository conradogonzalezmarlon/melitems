import { Injectable } from '@nestjs/common'
import { DefaultTranslator } from './default'
import { FileTranslator, FileTranslatorFactoryInput } from '.'

@Injectable()
export class FileTranslatorFactory {
    get(input: FileTranslatorFactoryInput): FileTranslator {
        return new DefaultTranslator({
            separator: input.separator,
            encoding: input.encoding,
        })
    }
}