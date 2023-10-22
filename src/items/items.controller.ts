import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadItemDto } from '../common/dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadItems(@UploadedFile() file: Express.Multer.File, @Body() body: UploadItemDto): Promise<string> {
    return this.itemsService.uploadItems(file, body)    
  }
}
