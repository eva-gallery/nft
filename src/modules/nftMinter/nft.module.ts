import { Module } from "@nestjs/common";
import { NftController } from "./nft.controller";
import { nftCreator } from "./nft.service";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [NestjsFormDataModule],
  controllers: [NftController],
  providers: [nftCreator],
})
export class NFTModule {}
