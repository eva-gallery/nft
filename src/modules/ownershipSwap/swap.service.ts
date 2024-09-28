import { Injectable, Logger } from "@nestjs/common";
import "@polkadot/api-augment";
import { SwapDto } from "./dto/SwapDto";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Extrinsic } from "@polkadot/types/interfaces";
import "@polkadot/api-augment";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";

@Injectable()
export class swapCreator {
  private readonly logger = new Logger(swapCreator.name);

  constructor(private configService: ConfigService<AppConfig>) {}
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

      // Create wallet instance
      const wallet = new Keyring({ type: "sr25519" });
      const secretKey = this.configService.get("WALLET_SECRET_KEY");
      const EvaGallerySigner = wallet.addFromUri(secretKey);

      // Sign and send the transaction, subscribe to the status of the transaction
      return new Promise<string>((resolve, reject) => {
        api
          .tx(call)
          .signAndSend(
            EvaGallerySigner,
            async ({ txHash, status, dispatchError }) => {
              if (status.isFinalized) {
                if (dispatchError) {
                  if (dispatchError.isModule) {
                    const decoded = api.registry.findMetaError(
                      dispatchError.asModule,
                    );
                    const { docs, name, section } = decoded;
                    reject(new Error(`${section}.${name}: ${docs.join(" ")}`));
                  } else {
                    reject(new Error(dispatchError.toString()));
                  }
                } else {
                  // No dispatch error, transaction is successful
                  resolve(txHash.toString());
                }
              }
            },
          );
      });
    } catch (error) {
      this.logger.error("Error creating swap call", error);
      return error;
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
