import { Injectable, Logger } from "@nestjs/common";
import "@polkadot/api-augment";
import { getClient } from "@kodadot1/uniquery";

@Injectable()
export class metadataService {
  private readonly logger = new Logger(metadataService.name)

  async getAccountNFTMetadata(address: string): Promise<string> {
    const client = getClient("ahk" as any);
    const query = client.itemListByOwner(address);
    try {
      const result = await client.fetch<any>(query);

      return result.data?.items;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
