import { Controller, Get, Param } from "@nestjs/common";
import { collectionMetaService } from "./colmeta.service";

@Controller('metadata')
export class CollectionMetaController {
  constructor(private readonly appService: collectionMetaService) {}

  @Get("collection/address/:address")
  getAccountNFTs(@Param("address") address: string) {
    return this.appService.getAccountColMetadata(address);
  }
}
