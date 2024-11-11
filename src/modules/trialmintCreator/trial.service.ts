import { Injectable, Logger } from "@nestjs/common";
import "@polkadot/api-augment";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { TrialDto } from "./dto/TrialDto";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { nftCreator } from "@modules/nftMinter/nft.service";
import { TransactionService } from "@common/utils";
import { NftDto } from "@modules/nftMinter/dto/NftDto";

@Injectable()
export class TrialCreator {
  private readonly logger = new Logger(TrialCreator.name);
  private nftCreatorInstance: nftCreator;
  constructor(private configService: ConfigService<AppConfig>, private transactionService: TransactionService
  ) {
    this.nftCreatorInstance = new nftCreator(configService);
  }

  async createTrialCall(data: TrialDto): Promise<string> {

    const { file, name, metadata } = data;

    try {

      // Create Api instance
      const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
      const api = await ApiPromise.create({ provider: wsProvider });

      const collectionID = this.configService.get("EVA_GALLERY_COLLECTION");

      //Create NFT DTO
      const nft: NftDto = {
        owner: this.configService.get("EVA_GALLERY_WALLET_ADDRESS"),
        metadata: metadata,
        name: name,
        file: file,
      };

      const call = await this.nftCreatorInstance.createNFTcall(
        collectionID,
        nft,
      );

      // Deconstruct hex encoded response clone to get NFT (aka ItemID)
      const nftTX = api.tx(call);
      const nftTx = await nftTX.args.toString();
      const parsedResponse = JSON.parse(nftTx); // Convert the string to a JSON object
      const nftID: string = parsedResponse[0].args.item;

      // Use the new signAndSendTransaction function
      const hashResponse = await this.transactionService.signAndSendTransaction(
        api,
        nftTX,
      );
      
      if (hashResponse != null) {
        return JSON.stringify({
          nftID,
        })    
      }
    }
    catch (error) {
      this.logger.error("Error creating trial call", error);
      throw new Error("Error creating trial call");
    }
  }
}
