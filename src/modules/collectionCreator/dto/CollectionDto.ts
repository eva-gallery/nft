import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CollectionDto {
  @IsNotEmpty()
  @IsString()
  owner: string;
  @IsOptional()
  @IsString()
  metadata: string;
}
