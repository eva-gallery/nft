import { Injectable, Logger } from "@nestjs/common";
import "@polkadot/api-augment";
import { SwapDto } from "./dto/SwapDto";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Extrinsic } from "@polkadot/types/interfaces";
import "@polkadot/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { TransactionService } from "@common/utils";

@Injectable()
export class swapCreator {
  private readonly logger = new Logger(swapCreator.name);

  constructor(private configService: ConfigService<AppConfig>,
    private readonly transactionService: TransactionService,
  ) {}
  async createSwapCall(
    collectionID: number,
    assetID: number,
    nft: SwapDto,
  ): Promise<string> {
    const { address } = nft;
    const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
    const api = await ApiPromise.create({ provider: wsProvider });

    try {
      const call = api.tx.nfts.transfer(collectionID, assetID, address);
      console.log(assetID, collectionID, address);
      // Use the new signAndSendTransaction function
      const txHash = await this.transactionService.signAndSendTransaction(api, call);
      return txHash;
    } catch (error) {
      this.logger.error("Error creating swap call", error);
      throw new Error("Error creating swap call");
    }
  }

  async getPayCall(address: string): Promise<Extrinsic> {
    const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
    const api = await ApiPromise.create({ provider: wsProvider });

    const valueInKSM = 0.0001;
    const valueInPlancks = Math.floor(valueInKSM * 1e12);

    const account = api.createType("AccountId32", address).toHex();
    const call = api.tx.balances.transferKeepAlive(account, valueInPlancks);

    return call;
  }
}
