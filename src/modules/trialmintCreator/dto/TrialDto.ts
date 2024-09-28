import { IsNotEmpty, IsString } from "class-validator";
import { MemoryStoredFile, IsFile, HasMimeType } from "nestjs-form-data";

export class TrialDto {
  @IsNotEmpty()
  @IsFile()
  @HasMimeType(["image/jpeg", "image/png"])
  file: MemoryStoredFile;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  metadata: string;
}
