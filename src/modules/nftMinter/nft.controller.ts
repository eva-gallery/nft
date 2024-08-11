import { Controller, Body, Put, Param } from "@nestjs/common";
import { nftCreator } from "./nft.service";
import { NftDto } from "./dto/NftDto";

@Controller()
export class NftController {
  constructor(private readonly appService: nftCreator) {}

  @Put("collection/:id/asset")
  GetNft(@Body() nft: NftDto, 
  @Param('id') collectionID: number,) {
    return this.appService.createNFTcall(collectionID, nft);
  }
}
