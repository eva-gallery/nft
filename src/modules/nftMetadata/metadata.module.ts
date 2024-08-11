import { Module } from "@nestjs/common";
import { MetadataController } from "./metadata.controller";
import { metadataService } from "./metadata.service";

@Module({
  imports: [],
  controllers: [MetadataController],
  providers: [metadataService],
})
export class MetadataModule {}
