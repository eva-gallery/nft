import { Injectable } from "@nestjs/common";
import { SwapDto } from "@modules/ownershipSwap/dto/SwapDto";
import { Extrinsic } from "@polkadot/types/interfaces";
import { NftDto } from "@modules/nftMinter/dto/NftDto";
import { CollectionDto } from "@modules/collectionCreator/dto/CollectionDto";
import { collectionCreator } from "@modules/collectionCreator/collection.service";
import { swapCreator } from "@modules/ownershipSwap/swap.service";
import { metadataService } from "@modules/nftMetadata/metadata.service";
import { nftCreator } from "@modules/nftMinter/nft.service";

@Injectable()
export class AppService {
  constructor(
    private readonly NftCreator: nftCreator,
    private readonly MetadataService: metadataService,
    private readonly SwapCreator: swapCreator,
    private readonly CollectionCreator: collectionCreator,
  ) {}

  async testCreateSwapCall(): Promise<Extrinsic> {
    const nft: SwapDto = {
      address: "13TrdLhMVLcwcEhMYLcqrkxAgq9M5gnK1LZKAF4VupVfQDUg",
    };
    return this.SwapCreator.getPayCall(nft.address);
  }

  async testQueryMetadata(): Promise<string> {
    const address = "EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB";
    return this.MetadataService.getAccountNFTMetadata(address);
  }

  async testCreateNft(): Promise<Extrinsic> {
    const nft: NftDto = {
      name: "Test NFT",
      metadata: "Meta",
      owner: "13TrdLhMVLcwcEhMYLcqrkxAgq9M5gnK1LZKAF4VupVfQDUg",
      file: null,
    };

    const collectionID = 1;
    return this.NftCreator.createNFTcall(collectionID, nft);
  }

  async testCreateCol(): Promise<Extrinsic> {
    const collectionDto: CollectionDto = {
      owner: "13TrdLhMVLcwcEhMYLcqrkxAgq9M5gnK1LZKAF4VupVfQDUg",
      metadata: "Meta",
      name: "Test Collection",
      file: null,
    };
    return this.CollectionCreator.createCollectionCall(collectionDto);
  }
}
