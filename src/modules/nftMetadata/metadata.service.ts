import { Injectable } from "@nestjs/common";
import "@polkadot/api-augment";
import { getClient } from "@kodadot1/uniquery";

@Injectable()
export class nftModuleService {
  async getAccountNFTMetadata(address: string): Promise<any> {
    const client = getClient("ahk" as any);
    const query = client.itemListByOwner(address);

    console.log(JSON.stringify(query, null, 2));

    try {
      const result = await client.fetch<any>(query);

      return result.data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
