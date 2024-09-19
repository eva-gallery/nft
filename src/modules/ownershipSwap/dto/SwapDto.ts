import { IsNotEmpty, IsString } from "class-validator";

export class SwapDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}
