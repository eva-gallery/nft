import { IsNotEmpty, IsString } from "class-validator";

export class UpdaterDto {
  @IsNotEmpty()
  @IsString()
  imgType: string;
  @IsNotEmpty()
  @IsString()
  imgIpfs: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  metadata: string;
}
