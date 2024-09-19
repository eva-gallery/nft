import { Injectable, Logger } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { NftDto } from "./dto/NftDto";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Extrinsic } from "@polkadot/types/interfaces";

const createNFT = (
  api: ApiPromise,
  collectionID: string,
  nftID: string,
  owner: string,
) => {
  const create = api.tx.nfts.mint(collectionID, nftID, owner, null);
  return create;
};

const setNFTMetadata = (
  api: ApiPromise,
  collectionId: string,
  nftId: string,
  metadata: string,
) => {
  const set = api.tx.nfts.setMetadata(collectionId, nftId, metadata);
  return set;
};

async function nextItemId(apiPromise: ApiPromise, collectionID: number) {
  try {
    const api = apiPromise;
    const result = await api.query.nfts.collection(collectionID.toString());

    const itemsList = result.unwrap();
    const nextItemId = itemsList.items.toNumber();
    return nextItemId + 1;
  } catch (error) {
    this.logger.error("Error getting NFT id", error);
    return 1;
  }
}

@Injectable()
export class nftCreator {
  private readonly logger = new Logger(nftCreator.name);
  constructor(private config: ConfigService<AppConfig>) {}
  async createNFTcall(collectionID: number, meta: NftDto): Promise<Extrinsic> {
    try {
      const { author, metadata } = meta;
      const wsProvider = new WsProvider(this.config.get("WSS_ENDPOINT"));
      const api = await ApiPromise.create({ provider: wsProvider });

      const nextNFT = await nextItemId(api, collectionID);
      this.logger.log("Next nft id:", nextNFT);

      const calls: SubmittableExtrinsic<"promise">[] = [
        createNFT(api, collectionID.toString(), nextNFT.toString(), author),
      ];

      calls.push(
        setNFTMetadata(
          api,
          collectionID.toString(),
          nextNFT.toString(),
          metadata.toString(),
        ),
      );

      // Create the batched transaction
      const batchAllTx = api.tx.utility.batchAll(calls);

      // Return the batched transaction in a human-readable format
      return batchAllTx;
    } catch (error) {
      this.logger.error("Error creating swap call", error);
      return error;
    }
  }
}
