import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';

export class CollectionDto {
  @IsNotEmpty()
  @IsString()
  owner: string;
  @IsFile()
  @IsOptional()
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  metadata: string;
}
