import { Module } from "@nestjs/common";
import { CollectionMetaController } from "./collection.controller";
import { collectionMetaService } from "./collection.service";

@Module({
  imports: [],
  controllers: [CollectionMetaController],
  providers: [collectionMetaService],
})
export class CollectionMetaModule {}
