import { IsNotEmpty } from 'class-validator';

export class AccountDto {
  @IsNotEmpty()
  account: string;
}