import { Controller, Body, Post, Req} from '@nestjs/common';
import { nftCreator } from './nft.service';
import { NftDto } from './dto/NftDto.js';

@Controller()
export class NftController {
  constructor(private readonly appService: nftCreator) {}

  @Post('generatenft')
  GetNft(
    @Body() nft : NftDto,
    @Req() req: Request,){
    return this.appService.createNFTcall(nft);
  }
}