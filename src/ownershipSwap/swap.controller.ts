import { Controller, Body, Post, Req} from '@nestjs/common';
import { swapCreator } from './swap.service';
import { SwapDto } from './dto/SwapDto.js';

@Controller()
export class SwapController {
  constructor(private readonly appService: swapCreator) {}

  @Post('changeowner')
  GetData(
    @Body() nft : SwapDto,
    @Req() req: Request,){
    return this.appService.createNFTcall(nft);
  }
}