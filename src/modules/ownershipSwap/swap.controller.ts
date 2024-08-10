import { Controller, Body, Post } from "@nestjs/common";
import { swapCreator } from "./swap.service.js";
import { SwapDto } from "./dto/SwapDto.js";

@Controller()
export class SwapController {
  constructor(private readonly appService: swapCreator) {}

  @Post("changeowner")
  GetData(@Body() nft: SwapDto) {
    return this.appService.createNFTcall(nft);
  }
}
