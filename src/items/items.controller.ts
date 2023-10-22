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

  /*@Post('test')
  uploadItems1(): StreamableFile  {
    const format = 'csv';
    const file = fs.createReadStream(path.join(process.cwd(), 'files', 'items2.txt'), { encoding: 'utf8' });
    let firstLine: string;
    let i = 0;
    const lines = [];

    const base64Decoder = new Transform({
      transform(chunk, encoding, callback) {
        console.log(chunk)
        callback(null, chunk);
      }
    });

    const utf8Converter = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk.toString('utf8'));
      }
    });

    pipeline(
      file,
      base64Decoder,
      utf8Converter,
      fs.createWriteStream(path.join(process.cwd(), 'files', 'test.txt')),
      (err) => {
        console.log(err)
      }
    )

  
    return;
    this.readLines(file, (line: string, index: number) => {
      console.log(Buffer.from(line, 'base64').toString('utf8'))

      if (index === 0) {
        firstLine = line;
        return;
      }

      if (format === 'csv') {
        const [site, id] = firstLine.split(',');
        const [value1, value2] = line.split(',')
        lines.push({ [site]: value1, [id]: value2 })
      }
    })
    return new StreamableFile(file);
  }

  private readLines(file: fs.ReadStream, cb: (chunk: string, index: number) => void) {
    const rl = readline.createInterface({
      input: file,
      output: process.stdout,
      terminal: false
    })

    let i = 0;
    rl.on('line', (chunk: string) => {
      cb(chunk, i);
      i++;
    })
  }

  @Get('test')
  test() {
    console.log('test')
    return 'test';
  }*/
}
