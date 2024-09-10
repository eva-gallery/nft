import { Controller, Body, Put } from "@nestjs/common";
import { collectionCreator } from "./collection.service";
import { CollectionDto } from "./dto/CollectionDto";

@Controller()
export class CollectionController {
  constructor(private readonly appService: collectionCreator) {}

  @Put("collection")
  getCollection(@Body() collection: CollectionDto) {
    return this.appService.createCollectionCall(collection);
  }
}
