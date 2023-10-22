import { IsOptional, IsIn } from "class-validator";

export class UploadItemDto {
    @IsOptional()
    @IsIn([',', '.', '-', '_', '\\t'])
    separator: string;

    @IsOptional()
    @IsIn(['ascii', 'utf8', 'utf-8', 'base64', 'hex'])
    encoding: BufferEncoding;

    @IsOptional()
    @IsIn(['csv', 'tsv', 'jsonl', 'txt'])
    format: string;
}