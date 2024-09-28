import { Controller, Body, Put, Param } from "@nestjs/common";
import { TrialDto } from "./dto/TrialDto";
import { TrialCreator } from "./trial.service";
import { FormDataRequest } from "nestjs-form-data";

@Controller('trial')
export class TrialController {
  constructor(private readonly appService: TrialCreator) {}

  @Put("mint")
  @FormDataRequest()
  getNft(@Body() update: TrialDto) {
    return this.appService.createTrialCall(update);
  }
}
