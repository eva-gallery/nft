import { Injectable } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { SwapDto } from "./dto/SwapDto";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";

@Injectable()
export class swapCreator {
  constructor(private configService: ConfigService<AppConfig>) {}
  async createNFTcall(collectionID: number, assetID: number, nft: SwapDto): Promise<any> {
    const { address } = nft;
    const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
    const api = await ApiPromise.create({ provider: wsProvider });

    const call = api.tx.nfts.transfer(collectionID, assetID, address);

    return call;
  }
}
