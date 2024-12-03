import { Controller, Get } from "@nestjs/common";
import { EvaService } from "./eva.service";


@Controller("eva")
export class EvaController {
  constructor(private readonly appService: EvaService) {}

  @Get("wallet/address")
  getEvaAddress() {
    return this.appService.getEvaWallet();
  }
  @Get("wallet/collection")
  getEvaCollection() {
    return this.appService.getEvaCollection();
  }

  @Get("ipfs/url")
  getEvaIpfsUrl() {
    return this.appService.getEvaIpfsUrl();
  }
}
