import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test-create-swap')
  async testCreateSwap() {
    return await this.appService.testCreateSwapCall();
  }

  @Get('test-query-metadata')
  async testQueryMetadata() {
    return await this.appService.testQueryMetadata();
  }

  @Get('test-create-nft')
  async testCreateNFT() {
    return await this.appService.testCreateNft();
  }

  @Get('test-create-collection')
  async testCreateCol() {
    return await this.appService.testCreateCol();
  }
}