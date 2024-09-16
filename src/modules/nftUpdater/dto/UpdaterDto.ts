import { IsNotEmpty, Matches, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class Metadata {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: "Name can only contain numbers, characters, and spaces",
  })
  name: string;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: "Description can only contain numbers, characters, and spaces",
  })
  metadata: string;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: "Image path can only contain numbers, characters, and spaces",
  })  
  image: string;
}

export class UpdaterDto {
  @IsNotEmpty()
  @ValidateNested() // Ensure that nested objects are validated
  @Type(() => Metadata) // Required for class-transformer to handle nested objects
  meta: Metadata;
}