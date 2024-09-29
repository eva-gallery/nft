import { Module } from "@nestjs/common";
import { SwapController } from "./swap.controller";
import { swapCreator } from "./swap.service";
import { TransactionModule } from "@common/utils.module";

@Module({
  imports: [TransactionModule],
  controllers: [SwapController],
  providers: [swapCreator],
})
export class SwapModule {}
