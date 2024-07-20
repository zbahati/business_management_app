import { Module } from '@nestjs/common';
import { StockoutService } from './stockout.service';
import { StockoutController } from './stockout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stockout } from './entities/stockout.entity';
import { CompanyModule } from 'src/company/company.module';
import { StockinModule } from 'src/stockin/stockin.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stockout]), CompanyModule, StockinModule, ProductModule],
  controllers: [StockoutController],
  providers: [StockoutService],
})
export class StockoutModule {}
