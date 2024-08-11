import { IsNotEmpty } from "class-validator";

export class Metadata {
  @IsNotEmpty()
  name: string;
  description: string;
  ipfs: string;
}

export class CollectionDto {
  @IsNotEmpty()
  owner: string;
  @IsNotEmpty()
  metadata: Metadata;
}
