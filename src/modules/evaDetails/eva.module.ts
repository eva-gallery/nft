import { Module } from "@nestjs/common";
import { EvaService } from "./eva.service";
import { EvaController } from "./eva.controller";

@Module({
  imports: [],
  controllers: [EvaController],
  providers: [EvaService],
})
export class EvaModule {}
