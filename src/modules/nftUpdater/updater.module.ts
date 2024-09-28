import { Module } from "@nestjs/common";
import { UpdateController } from "./updater.controller";
import { UpdaterCreator } from "./updater.service";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [NestjsFormDataModule],
  controllers: [UpdateController],
  providers: [UpdaterCreator],
})
export class UpdateModule {}
