import { Controller, Body, Put } from "@nestjs/common";
import { collectionCreator } from "./collection.service";
import { CollectionDto } from "./dto/CollectionDto";
import { FormDataRequest } from "nestjs-form-data";

@Controller('collection')
export class CollectionController {
  constructor(private readonly appService: collectionCreator) {}

  @Put("create")
  @FormDataRequest()
  getCollection(@Body() collection: CollectionDto) {
    return this.appService.createCollectionCall(collection);
  }
}
