import { Module } from "@nestjs/common";
import { NftController } from "./nft.controller";
import { nftCreator } from "./nft.service";
import { NestjsFormDataModule } from "nestjs-form-data";
import { UpdateModule } from "@modules/nftUpdater/updater.module";

@Module({
  imports: [NestjsFormDataModule, UpdateModule],
  controllers: [NftController],
  providers: [nftCreator],
})
export class NFTModule {}
