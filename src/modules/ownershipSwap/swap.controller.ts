import { Controller, Body, Post, Param } from "@nestjs/common";
import { swapCreator } from "./swap.service.js";
import { SwapDto } from "./dto/SwapDto.js";

@Controller()
export class SwapController {
  constructor(private readonly appService: swapCreator) {}

  @Post("transfer/collection/:collection/asset/:asset")
  GetData(@Body() nft: SwapDto,
  @Param('collection') collection: number,
  @Param('asset') asset: number) {
    return this.appService.createNFTcall(collection, asset, nft);
  }
}
