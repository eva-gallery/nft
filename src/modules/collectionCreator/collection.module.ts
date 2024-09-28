import { Module } from "@nestjs/common";
import { CollectionController } from "./collection.controller";
import { collectionCreator } from "./collection.service";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [NestjsFormDataModule],
  controllers: [CollectionController],
  providers: [collectionCreator],
})
export class CollectionModule {}
