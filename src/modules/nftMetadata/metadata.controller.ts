import { Controller, Get, Param, Query } from "@nestjs/common";
import { nftModuleService } from "./metadata.service.js";

@Controller()
export class MetadataController {
  constructor(private readonly appService: nftModuleService) {}

  @Get("address/:address")
  getAccountNFTs(@Param('address') address: string) {
    return this.appService.getAccountNFTMetadata(address);
  }
}
