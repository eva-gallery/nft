import { Injectable, Logger } from "@nestjs/common";
import "@polkadot/api-augment";
import { getClient } from "@kodadot1/uniquery";

@Injectable()
export class collectionMetaService {
  private readonly logger = new Logger(collectionMetaService.name);

  async getAccountColMetadata(address: string): Promise<string> {
    const client = getClient("ahk" as any);
    const query = client.collectionListByOwner(address);
    try {
      const result = await client.fetch<any>(query);
      return result.data?.collections;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
