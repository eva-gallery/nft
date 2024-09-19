import { IsNotEmpty } from "class-validator";

export class UpdaterDto {
  @IsNotEmpty()
  meta: string;
}
