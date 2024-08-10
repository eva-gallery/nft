import { Module } from "@nestjs/common";
import { SwapController } from "./swap.controller";
import { swapCreator } from "./swap.service";

@Module({
  imports: [],
  controllers: [SwapController],
  providers: [swapCreator],
})
export class SwapModule {}
