import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CollectionModule } from "./modules/collectionCreator/collection.module";
import { MetadataModule } from "./modules/nftMetadata/metadata.module";
import { NFTModule } from "./modules/nftMinter/nft.module";
import { SwapModule } from "./modules/ownershipSwap/swap.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NFTModule,
    CollectionModule,
    MetadataModule,
    SwapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
