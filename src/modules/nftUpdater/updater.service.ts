import { Injectable, Logger } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Extrinsic } from "@polkadot/types/interfaces";
import { UpdaterDto } from "./dto/UpdaterDto";
import { create } from "ipfs-http-client";

@Injectable()
export class UpdaterCreator {
  private readonly logger = new Logger(UpdaterCreator.name);
  constructor(private configService: ConfigService<AppConfig>) {}
  async createUpdateCall(
    ids: string,
    newMetadata: UpdaterDto,
  ): Promise<Extrinsic> {
    const { file, name, metadata } = newMetadata;

    let cid = null;
    let metadataCid = null;

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

    const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
    this.logger.log(this.configService.get("WSS_ENDPOINT"));
    const api = await ApiPromise.create({ provider: wsProvider });
    //Parse ids to collectionId and nftId
    const { collectionId, assetId } = this.parseAssetId(ids);
    try {
      const call = api.tx.nfts.setMetadata(
        collectionId,
        assetId,
        metadataCid.path,
      );
      return call;
    } catch (error) {
      this.logger.error("Error creating update call", error);
      return error;
    }
  }

  parseAssetId(input: string): { collectionId: number; assetId: number } {
    // Regular expression to match the pattern "u-collectionId-assetId"
    const uniquePattern = /^u-(\d+)-(\d+)$/;
    // Regular expression to match the pattern "collectionId-assetId"
    const standardPattern = /^(\d+)-(\d+)$/;

    let match = input.match(uniquePattern);
    if (match) {
      // Handle the "u-" prefix case
      throw new Error(
        "Updating assets created with Uniques pallet is not supported",
      );
    }

    match = input.match(standardPattern);
    if (match) {
      // Extract collectionId and assetId from the match result
      const collectionId = parseInt(match[1], 10);
      const assetId = parseInt(match[2], 10);
      return { collectionId, assetId };
    }

    // If the input does not match any of the patterns, throw an error
    throw new Error("Invalid asset ID format");
  }
}
