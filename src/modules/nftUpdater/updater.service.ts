import { Injectable, Logger } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Extrinsic } from "@polkadot/types/interfaces";
import { UpdaterDto } from "./dto/UpdaterDto";

@Injectable()
export class UpdaterCreator {
  private readonly logger = new Logger(UpdaterCreator.name)
  constructor(private configService: ConfigService<AppConfig>) {}
  async createUpdateCall(
    ids: string,
    newMetadata: UpdaterDto,
  ): Promise<Extrinsic> {
    const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
    this.logger.log(this.configService.get("WSS_ENDPOINT"));
    const api = await ApiPromise.create({ provider: wsProvider });
    //Parse ids to collectionId and nftId
    const { collectionId, assetId } = this.parseAssetId(ids);
    try {
      const call = api.tx.nfts.setMetadata(
        collectionId,
        assetId,
        newMetadata.toString(),
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
