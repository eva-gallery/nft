import { IsNotEmpty, IsString } from "class-validator";

export class NftDto {
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsNotEmpty()
  @IsString()
  metadata: string;
}
