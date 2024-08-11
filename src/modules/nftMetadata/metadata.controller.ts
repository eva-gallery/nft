import { Controller, Get, Param, Query } from "@nestjs/common";
import { metadataService } from "./metadata.service.js";

@Controller()
export class MetadataController {
  constructor(private readonly appService: metadataService) {}

  @Get("address/:address")
  getAccountNFTs(@Param('address') address: string) {
    return this.appService.getAccountNFTMetadata(address);
  }
}
