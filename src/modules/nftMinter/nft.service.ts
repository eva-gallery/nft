import { Injectable, Logger } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { NftDto } from "./dto/NftDto";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Extrinsic } from "@polkadot/types/interfaces";
import { create } from "ipfs-http-client";

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
  constructor(private configService: ConfigService<AppConfig>) {}

  async createNFTcall(collectionID: number, meta: NftDto): Promise<Extrinsic> {
    try {
      const { owner, file = null, metadata = null, name = null } = meta;

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
      const body = JSON.stringify({
        name: name,
        image: cid.path,
        description: metadata,
      });

      metadataCid = await client.add(body);

      const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
      const api = await ApiPromise.create({ provider: wsProvider });

      const nextNFT = await nextItemId(api, collectionID);
      this.logger.log("Next nft id:", nextNFT);
      const calls: SubmittableExtrinsic<"promise">[] = [
        createNFT(api, collectionID.toString(), nextNFT.toString(), owner),
      ];

      calls.push(
        setNFTMetadata(
          api,
          collectionID.toString(),
          nextNFT.toString(),
          metadataCid.path,
        ),
      );

      // Create the batched transaction
      const batchAllTx = api.tx.utility.batchAll(calls);

      // Return the batched transaction in a human-readable format
      return batchAllTx;
    } catch (error) {
      this.logger.error("Error creating NFT call", error);
      return error;
    }
  }
}
