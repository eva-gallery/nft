import { Injectable } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { SwapDto } from "./dto/SwapDto";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Extrinsic } from "@polkadot/types/interfaces";

@Injectable()
export class swapCreator {
  constructor(private configService: ConfigService<AppConfig>) {}
  async createSwapCall(collectionID: number, assetID: number, nft: SwapDto): Promise<Extrinsic> {
    const { address } = nft;
    const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
    const api = await ApiPromise.create({ provider: wsProvider });

    const call = api.tx.nfts.transfer(collectionID, assetID, address);

    return call;
  }
}
