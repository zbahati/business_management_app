import { Module } from '@nestjs/common';
import { StockinService } from './stockin.service';
import { StockinController } from './stockin.controller';

@Module({
  controllers: [StockinController],
  providers: [StockinService],
})
export class StockinModule {}
