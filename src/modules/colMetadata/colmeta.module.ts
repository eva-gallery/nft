import { Module } from "@nestjs/common";
import { CollectionMetaController } from "./colmeta.controller";
import { collectionMetaService } from "./colmeta.service";

@Module({
  imports: [],
  controllers: [CollectionMetaController],
  providers: [collectionMetaService],
})
export class CollectionMetaModule {}
