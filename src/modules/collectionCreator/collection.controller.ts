import { Controller, Body, Put } from "@nestjs/common";
import { collectionCreator } from "./collection.service";
import { CollectionDto } from "./dto/CollectionDto.js";

@Controller()
export class CollectionController {
  constructor(private readonly appService: collectionCreator) {}

  @Put("collection")
  GetCollection(@Body() collection: CollectionDto) {
    return this.appService.createCollectionCall(collection);
  }
}
