import { Module } from '@nestjs/common';
import { StockoutService } from './stockout.service';
import { StockoutController } from './stockout.controller';

@Module({
  controllers: [StockoutController],
  providers: [StockoutService],
})
export class StockoutModule {}
