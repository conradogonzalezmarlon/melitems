/// <reference types="multer" />
import { UploadItemDto } from '../common/dto';
import { FileTranslatorFactory } from '../common/local';
import { Queue } from 'bull';
export declare class ItemsService {
    private readonly fileTranslatorFactory;
    private itemsQueue;
    constructor(fileTranslatorFactory: FileTranslatorFactory, itemsQueue: Queue);
    uploadItems(file: Express.Multer.File, data: UploadItemDto): Promise<string>;
}
