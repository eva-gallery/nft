import { Module } from "@nestjs/common";
import { TransactionService } from "./utils";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
