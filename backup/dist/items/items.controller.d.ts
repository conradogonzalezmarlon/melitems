/// <reference types="multer" />
import { ItemsService } from './items.service';
import { UploadItemDto } from '../common/dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    uploadItems(file: Express.Multer.File, body: UploadItemDto): Promise<string>;
}
