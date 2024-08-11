import { IsNotEmpty } from "class-validator";

export class Metadata {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  ipfs: string;
  @IsNotEmpty()
  author: string;
}

export class NftDto {
  @IsNotEmpty()
  metadata: Metadata;
}
