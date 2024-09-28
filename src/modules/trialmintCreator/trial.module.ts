import { Module } from "@nestjs/common";
import { TrialCreator } from "./trial.service";
import { NestjsFormDataModule } from "nestjs-form-data";
import { TrialController } from "./trial.controller";

@Module({
  imports: [NestjsFormDataModule],
  controllers: [TrialController],
  providers: [TrialCreator],
})
export class TrialModule {}
