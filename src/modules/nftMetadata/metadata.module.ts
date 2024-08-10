import { Module } from "@nestjs/common";
import { MetadataController } from "./metadata.controller";
import { nftModuleService } from "./metadata.service";

@Module({
  imports: [],
  controllers: [MetadataController],
  providers: [nftModuleService],
})
export class MetadataModule {}
