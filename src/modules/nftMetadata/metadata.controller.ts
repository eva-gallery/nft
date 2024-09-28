import { Controller, Get, Param } from "@nestjs/common";
import { metadataService } from "./metadata.service";

@Controller('metadata')
export class MetadataController {
  constructor(private readonly appService: metadataService) {}

  @Get("nft/address/:address")
  getAccountNFTs(@Param("address") address: string) {
    return this.appService.getAccountNFTMetadata(address);
  }
}
