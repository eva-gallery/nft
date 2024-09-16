import { Module } from "@nestjs/common";
import { UpdateController } from "./updater.controller";
import { UpdaterCreator } from "./updater.service";


@Module({
  imports: [],
  controllers: [UpdateController],
  providers: [UpdaterCreator],
})
export class UpdateModule {}
