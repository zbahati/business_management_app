import { Module } from '@nestjs/common';
import { StockinService } from './stockin.service';
import { StockinController } from './stockin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stockin } from './entities/stockin.entity';
import { CompanyModule } from 'src/company/company.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stockin]), CompanyModule, ProductModule],
  controllers: [StockinController],
  providers: [StockinService],
  exports: [StockinService]
})
export class StockinModule {}
