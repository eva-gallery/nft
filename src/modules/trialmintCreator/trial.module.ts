import { Module } from "@nestjs/common";
import { TrialCreator } from "./trial.service";
import { NestjsFormDataModule } from "nestjs-form-data";
import { TrialController } from "./trial.controller";
import { TransactionModule } from "@common/utils.module";
import { NFTModule } from "@modules/nftMinter/nft.module";

@Module({
  imports: [NestjsFormDataModule, TransactionModule, NFTModule],
  controllers: [TrialController],
  providers: [TrialCreator],
})
export class TrialModule {}
