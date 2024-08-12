import { IsNotEmpty, Matches, Length, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class Metadata {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]*$/, { message: 'Name can only contain numbers, characters, and spaces' })
  name: string;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]*$/, { message: 'Description can only contain numbers, characters, and spaces' })
  description: string;
  @IsNotEmpty()
  @Matches(/^ipfs:\/\/.*/, { message: 'ipfs must start with ipfs://' })
  ipfs: string;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]*$/, { message: 'Address can only contain numbers and characters' })
  @Length(48, 48, { message: 'Polkadot wallet address must be exactly 48 characters long' })
  author: string;
}

export class NftDto {
  @IsNotEmpty()
  @ValidateNested() // Ensure that nested objects are validated
  @Type(() => Metadata) // Required for class-transformer to handle nested objects
  metadata: Metadata;
}
