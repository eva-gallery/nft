import { IsNotEmpty, Matches, Length } from "class-validator";

export class SwapDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]*$/, { message: 'Address can only contain numbers and characters' })
  @Length(32, 32, { message: 'Polkadot wallet address must be exactly 32 characters long' })
  address: string;
}
