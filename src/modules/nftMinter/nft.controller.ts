import { Controller, Body, Post } from "@nestjs/common";
import { nftCreator } from "./nft.service.js";
import { NftDto } from "./dto/NftDto.js";

@Controller()
export class NftController {
  constructor(private readonly appService: nftCreator) {}

  @Post("generatenft")
  GetNft(@Body() nft: NftDto) {
    return this.appService.createNFTcall(nft);
  }
}
