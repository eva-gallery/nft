import { Injectable } from "@nestjs/common";
import "@polkadot/api-augment";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Keyring } from "@polkadot/api";

@Injectable()
export class EvaService {
  constructor(private configService: ConfigService<AppConfig>) {}

  getEvaWallet(): string {
    const secret = this.configService.get("WALLET_SECRET_KEY");
    const keyring = new Keyring({ type: "sr25519" });

    const eva = keyring.addFromUri(secret);
    return keyring.encodeAddress(eva.address, 2);
  }

  getEvaCollection(): string {
    return this.configService.get("EVA_GALLERY_COLLECTION");
  }

  getEvaIpfsUrl(): string {
    return this.configService.get("IPFS_URL");
  }
}
