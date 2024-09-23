import { Controller, Get, Param } from "@nestjs/common";
import { collectionMetaService } from "./collection.service";

@Controller('collection')
export class CollectionMetaController {
  constructor(private readonly appService: collectionMetaService) {}

  @Get("address/:address")
  getAccountNFTs(@Param("address") address: string) {
    return this.appService.getAccountColMetadata(address);
  }
}
