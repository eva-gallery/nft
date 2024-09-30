import { Injectable, Logger } from "@nestjs/common";
import "@polkadot/api-augment";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { TrialDto } from "./dto/TrialDto";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { create } from "ipfs-http-client";
import { nftCreator } from "@modules/nftMinter/nft.service";
import { TransactionService } from "@common/utils";

@Injectable()
export class TrialCreator {
  private readonly transactionService: TransactionService;
  private readonly logger = new Logger(TrialCreator.name);
  private nftCreatorInstance: nftCreator;
  constructor(private configService: ConfigService<AppConfig>) {
    this.nftCreatorInstance = new nftCreator(configService);
  }

  async createTrialCall(data: TrialDto): Promise<string> {
    let cid = null;
    let metadataCid = null;

    const { file, name, metadata } = data;

    console.log(data);
    try {
      const IPFS_NODE_URL = this.configService.get("IPFS_URL");
      const username = this.configService.get("IPFS_NAME");
      const password = this.configService.get("IPFS_PASSWORD");

      const auth =
        "Basic " + Buffer.from(username + ":" + password).toString("base64");
      const client = create({
        url: IPFS_NODE_URL,
        headers: {
          authorization: auth,
        },
      });
      cid = await client.add(file.buffer);
      const meta = JSON.stringify({
        name: name,
        image: cid.path,
        description: metadata,
      });

      metadataCid = await client.add(meta);
    } catch (error) {
      this.logger.error("Error adding file to IPFS:", error);
      throw new Error("Failed to add file to IPFS");
    }

    // Create Api instance
    const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
    const api = await ApiPromise.create({ provider: wsProvider });

    const collectionID = this.configService.get("EVA_GALLERY_COLLECTION");
    const call = await this.nftCreatorInstance.createNFTcall(
      collectionID,
      metadataCid.path,
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
        metadataCid: metadataCid.path,
        cid: cid.path,
      })    
    }
  }
}
