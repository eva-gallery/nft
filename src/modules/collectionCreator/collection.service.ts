import { Injectable } from "@nestjs/common";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { CollectionDto } from "./dto/CollectionDto";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@common/config";

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
    console.error("Error getting collection id", error);
    return undefined;
  }
}

@Injectable()
export class collectionCreator {
  constructor(private configService: ConfigService<AppConfig>) {}

  async createCollectionCall(collection: CollectionDto): Promise<any> {
    const { address, metadata } = collection;

    const wsProvider = new WsProvider(this.configService.get("WSS_ENDPOINT"));
    const api = await ApiPromise.create({ provider: wsProvider });
    const collectionId = await nextCollectionId(api);
    console.log("Next collection id:", collectionId);
    const calls: SubmittableExtrinsic<"promise">[] = [
      createCollection(api, address),
    ];
    if (metadata) {
      calls.push(
        setCollectionMetadata(api, collectionId, JSON.stringify(metadata)),
      );
    }
    // Create the batched transaction
    const batchAllTx = api.tx.utility.batchAll(calls);

    // Return the batched transaction in a human-readable format
    return batchAllTx;
  }
}
