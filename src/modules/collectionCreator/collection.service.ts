import { Injectable, Logger } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { CollectionDto } from "./dto/CollectionDto";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";
import { Extrinsic } from "@polkadot/types/interfaces";
import { create } from "ipfs-http-client";

function createArgsForNftPallet(
  account: string,
  maxSupply?: number,
): [string, any] {
  const config = {
    settings: 0,
    maxSupply,
    mintSettings: {
      mintType: { Issuer: null },
      defaultItemSettings: 0,
    },
  };
  return [account, config];
}

const createCollection = (api: ApiPromise, owner: string) => {
  const args = createArgsForNftPallet(owner);
  const create = api.tx.nfts.create(...args);
  return create;
};

const setCollectionMetadata = (
  api: ApiPromise,
  collectionId: string,
  metadata: string,
) => {
  const set = api.tx.nfts.setCollectionMetadata(collectionId, metadata);
  return set;
};

async function nextCollectionId(apiPromise: ApiPromise) {
  try {
    const api = apiPromise;
    const result = await api.query.nfts.nextCollectionId();

    return (result as any).unwrap().toNumber();
  } catch (error) {
    this.logger.error("Error getting collection id", error);
    return undefined;
  }
}

@Injectable()
export class collectionCreator {
  private readonly logger = new Logger(collectionCreator.name);
  constructor(private configService: ConfigService<AppConfig>) {}

  async createCollectionCall(collection: CollectionDto): Promise<Extrinsic> {
    try {
      const { owner, file = null, metadata = null, name = null } = collection;

      let cid = null;
      let cidMeta = null;
      let body = null;

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

        if (file != null) {
          cid = await client.add(file.buffer);
        }

        if (cid == null) {
          body = JSON.stringify({ name: name, description: metadata });
        } else if (metadata == null) {
          body = JSON.stringify({ name: name, image: cid.path });
        } else if (metadata == null && cid == null) {
          body = JSON.stringify({ name: name });
        } else {
          body = JSON.stringify({
            name: name,
            image: cid.path,
            description: metadata,
          });
        }

        cidMeta = await client.add(body);
      } catch (error) {
        this.logger.error("Error adding file to IPFS:", error);
        throw new Error("Failed to add file to IPFS");
      }

      const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
      const api = await ApiPromise.create({ provider: wsProvider });
      const collectionId = await nextCollectionId(api);
      this.logger.log("Next collection id:", collectionId);
      const calls: SubmittableExtrinsic<"promise">[] = [
        createCollection(api, owner),
      ];
      if (metadata) {
        calls.push(setCollectionMetadata(api, collectionId, "ipfs://ipfs/"+cidMeta.path));
      }
      // Create the batched transaction
      const batchAllTx = api.tx.utility.batchAll(calls);

      // Return the batched transaction in a human-readable format
      return batchAllTx;
    } catch (error) {
      this.logger.error("Error creating collection call", error);
      return error;
    }
  }
}
