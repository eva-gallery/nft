import { Controller, Body, Put, Param } from "@nestjs/common";
import { UpdaterDto } from "./dto/UpdaterDto";
import { UpdaterCreator } from "./updater.service";
import { FormDataRequest } from "nestjs-form-data";

@Controller()
export class UpdateController {
  constructor(private readonly appService: UpdaterCreator) {}

  @Put("update/asset/:id")
  @FormDataRequest()
  getNft(@Body() update: UpdaterDto, @Param("id") ids: string) {
    return this.appService.createUpdateCall(ids, update);
  }
}
