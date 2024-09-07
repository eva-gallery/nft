import { IsNotEmpty, Matches, Length } from 'class-validator';

export class SwapDto {
  
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9]*$/, {
    message: 'Address can only contain numbers and characters',
  })
  address: string;
  
}
