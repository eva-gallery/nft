import { Controller, Get, Query, Req} from '@nestjs/common';
import { nftModuleService } from './metadata.service.js';
import { AccountDto } from './dto/AccountDto.js';

@Controller()
export class MetadataController {
  constructor(private readonly appService: nftModuleService) {}

  @Get('nftmeta')
  getAccountNFTs(
    @Query() { account }: AccountDto,
    @Req() req: Request,){
    return this.appService.getAccountNFTMetadata(account);
  }
}
