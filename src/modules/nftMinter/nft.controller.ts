import { Controller, Body, Put, Param } from "@nestjs/common";
import { nftCreator } from "./nft.service";
import { NftDto } from "./dto/NftDto";
import { FormDataRequest } from "nestjs-form-data";


@Controller('collection')
export class NftController {
  constructor(private readonly appService: nftCreator) {}

  @Put(":id/asset")
  @FormDataRequest()
  getNft(@Body() nft: NftDto, @Param("id") collectionID: number) {
    return this.appService.createNFTcall(collectionID, nft);
  }
}
