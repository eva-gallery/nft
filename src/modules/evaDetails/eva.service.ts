import { Injectable } from "@nestjs/common";
import "@polkadot/api-augment";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";

@Injectable()
export class EvaService {
  constructor(private configService: ConfigService<AppConfig>) {}

  getEvaWallet(): string {
    return this.configService.get("EVA_GALLERY_WALLET_ADDRESS");
  }

  getEvaCollection(): string {
    return this.configService.get("EVA_GALLERY_COLLECTION");
  }
}
